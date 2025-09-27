// src/hooks/use-base-form.ts
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FormField } from "@/types/form";
import { useState } from "react";
import React from "react";

// Helper function to filter fields based on 'condition' property
function filterFieldsByCondition(fields: FormField[], values: Record<string, any>): FormField[] {
  return fields
    .filter((field) => !field.condition || field.condition(values))
    .map((field) => {
      if (field.type === "section" && field.fields) {
        return {
          ...field,
          fields: filterFieldsByCondition(field.fields, values),
        };
      }
      if (field.type === "repeatable" && field.fields) {
        return {
          ...field,
          fields: filterFieldsByCondition(field.fields, values),
        };
      }
      return field;
    });
}

export const useBaseForm = (schema: {
  fields: FormField[];
  onSubmit: (data: any) => void;
  defaultValues?: Record<string, any>;
  onChange?: (values: any) => void;
  validationSchema?: any;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Helper function to process fields recursively and handle nested objects
  const processFields = (fields: FormField[]): Record<string, any> => {
    return fields.reduce(
      (acc, field) => {
        if (field.type === "section") {
          // Process nested fields in sections and group them by their parent object
          const nestedFields = processFields(field.fields || []);

          // Group fields by their parent object (e.g., address.street -> address object)
          const groupedFields: Record<string, Record<string, any>> = {};

          Object.entries(nestedFields).forEach(([fieldName, validation]) => {
            const parts = fieldName.split(".");
            if (parts.length > 1) {
              const parentKey = parts[0];
              const childKey = parts.slice(1).join(".");

              if (!groupedFields[parentKey]) {
                groupedFields[parentKey] = {};
              }
              groupedFields[parentKey][childKey] = validation;
            } else {
              // Handle flat fields
              acc[fieldName] = validation;
            }
          });

          // Add grouped objects to the schema
          Object.entries(groupedFields).forEach(([parentKey, childFields]) => {
            acc[parentKey] = z.object(childFields).optional();
          });
        } else if (field.type === "repeatable") {
          // Handle repeatable fields - create array schema
          if (field.fields && field.fields.length > 0) {
            const itemSchema = z.object(
              field.fields.reduce(
                (itemAcc, subField) => {
                  if (subField.validation) {
                    itemAcc[subField.name] = subField.validation;
                  }
                  return itemAcc;
                },
                {} as Record<string, any>
              )
            );
            acc[field.name] = z.array(itemSchema).optional().default([]);
          }
        } else if (field.validation) {
          // Regular field with validation
          acc[field.name] = field.validation;
        }
        return acc;
      },
      {} as Record<string, any>
    );
  };

  // Create validation schema - use provided schema or create from fields
  const validationSchema = schema.validationSchema || z.object(processFields(schema.fields));

  const form = useForm({
    resolver: zodResolver(validationSchema),
    mode: "onChange",
    defaultValues: schema.defaultValues || {},
  });

  // Set up form watching for onChange callback
  React.useEffect(() => {
    if (schema.onChange) {
      const subscription = form.watch((value) => {
        schema.onChange!(value);
      });
      return () => subscription.unsubscribe();
    }
  }, [form, schema.onChange]);

  // Filter fields by condition on every render using watch for reactivity
  const watchedValues = form.watch();
  const filteredFields = filterFieldsByCondition(schema.fields, watchedValues);

  const onSubmit = async (data: any) => {
    try {
      setIsSubmitting(true);
      await schema.onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    fields: filteredFields,
    onSubmit,
    isSubmitting,
    isLoading,
  };
};
