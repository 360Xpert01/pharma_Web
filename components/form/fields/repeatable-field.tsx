import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FormField as ShadFormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormField } from "@/types/form";
import { useFormContext } from "react-hook-form";
import { cn } from "@/lib/utils";
import { InputField } from "./input";
import { SelectField } from "./select";
import { TextareaField } from "./textarea";
import { CheckboxField } from "./checkbox";
import { DateField } from "./date-input";
import { Plus, Trash2 } from "lucide-react";
import { DynamicSelectField } from "./dynamic-select";
import { ToggleField } from "./toggle";

interface RepeatableFieldProps {
  field: FormField & { type: "repeatable" };
}

export const RepeatableField = ({ field }: RepeatableFieldProps) => {
  const form = useFormContext();
  const [isOpen, setIsOpen] = useState(field.defaultOpen ?? true);
  const isCollapsible = field.collapsible ?? true;

  // Track touched state for each item
  const [touched, setTouched] = useState<Record<number, boolean>>({});

  const getGridClasses = () => {
    if (!field.grid) return "space-y-4";

    const { columns, gap = "4" } = field.grid;
    const gapClass = `gap-${gap}`;
    const classes: string[] = ["grid", gapClass];

    if (typeof columns === "number") {
      classes.push(`grid-cols-${columns}`);
    } else {
      if (columns?.sm) classes.push(`grid-cols-${columns.sm}`);
      if (columns?.md) classes.push(`md:grid-cols-${columns.md}`);
      if (columns?.lg) classes.push(`lg:grid-cols-${columns.lg}`);
    }

    const result = classes.join(" ");
    console.log("Repeatable field grid classes:", result, "for field:", field.name);
    return result;
  };

  // Helper function to get the appropriate field component
  const getFieldComponent = (type: string) => {
    const components: Record<string, any> = {
      text: InputField,
      number: InputField,
      email: InputField,
      textarea: TextareaField,
      select: SelectField,
      checkbox: CheckboxField,
      toggle: ToggleField,
      dynamicselect: DynamicSelectField,
      date: DateField,
      "datetime-local": InputField,
    };

    return components[type];
  };

  const addItem = () => {
    const currentValue = form.getValues(field.name) || [];
    if (field.maxItems && currentValue.length >= field.maxItems) return;

    const newItem = field.fields.reduce(
      (acc, f) => {
        // For select fields, default to '' (string)
        if (f.type === "select") {
          acc[f.name] = f.defaultValue !== undefined ? f.defaultValue : "";
        } else if (f.name === "unit") {
          acc[f.name] = "SQM";
        } else {
          acc[f.name] = f.defaultValue !== undefined ? f.defaultValue : "";
        }
        return acc;
      },
      {} as Record<string, any>
    );

    form.setValue(field.name, [...currentValue, newItem], {
      shouldValidate: false,
      shouldDirty: true,
      shouldTouch: false,
    });
    setTouched((prev) => ({ ...prev, [currentValue.length]: false }));
  };

  const removeItem = (index: number) => {
    const currentValue = form.getValues(field.name) || [];
    if (field.minItems && currentValue.length <= field.minItems) return;

    const newValue = currentValue.filter((_, i) => i !== index);
    form.setValue(field.name, newValue, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
    setTouched((prev) => {
      const copy = { ...prev };
      delete copy[index];
      return copy;
    });
  };

  // Only show errors for touched/dirty fields or after submit
  const showError = (index: number) => {
    const isSubmitted = form.formState.isSubmitted;
    return touched[index] || isSubmitted;
  };

  // Auto-calculate area for measurements if length and width are present
  useEffect(() => {
    if (!Array.isArray(form.getValues(field.name))) return;
    const items = form.getValues(field.name);
    const updated = items.map((item: any) => {
      // Show live area value
      if (
        typeof item.length !== "undefined" &&
        typeof item.width !== "undefined" &&
        item.length !== "" &&
        item.width !== "" &&
        !isNaN(Number(item.length)) &&
        !isNaN(Number(item.width))
      ) {
        return { ...item, area: Number(item.length) * Number(item.width) };
      }
      return { ...item, area: "" };
    });
    if (JSON.stringify(items) !== JSON.stringify(updated)) {
      form.setValue(field.name, updated, { shouldValidate: false });
    }
  }, [form.watch(field.name)]);

  return (
    <div className="w-full">
      <ShadFormField
        control={form.control}
        name={field.name}
        render={({ field: formField }) => (
          <FormItem className="w-full">
            <FormLabel>
              {field.label}
              {field.required && <span className="ml-1 text-destructive">*</span>}
            </FormLabel>

            <div className="w-full space-y-4">
              {(formField.value || []).map((item: any, index: number) => (
                <Card key={index} className="relative w-full">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        {field.label} #{index + 1}
                      </CardTitle>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeItem(index)}
                        disabled={
                          field.minItems ? (formField.value || []).length <= field.minItems : false
                        }
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="w-full">
                    <div className={cn(getGridClasses(), "w-full")}>
                      {field.fields.map((subField) => {
                        const FieldComponent = getFieldComponent(subField.type);
                        if (!FieldComponent) return null;
                        // Always disable area field
                        const isAreaField = subField.name === "area";
                        // For area, show live value
                        const value = isAreaField
                          ? item.length !== "" &&
                            item.width !== "" &&
                            !isNaN(Number(item.length)) &&
                            !isNaN(Number(item.width))
                            ? Number(item.length) * Number(item.width)
                            : ""
                          : item[subField.name];
                        return (
                          <div
                            key={subField.id}
                            className="w-full"
                            onBlur={() => setTouched((prev) => ({ ...prev, [index]: true }))}
                          >
                            <FieldComponent
                              field={{
                                ...subField,
                                name: `${field.name}.${index}.${subField.name}`,
                                value,
                                onChange: (val: any) => {
                                  const currentValue = form.getValues(field.name) || [];
                                  const newValue = [...currentValue];
                                  newValue[index] = {
                                    ...newValue[index],
                                    [subField.name]: val,
                                  };
                                  form.setValue(field.name, newValue, {
                                    shouldValidate: true,
                                    shouldDirty: true,
                                    shouldTouch: true,
                                  });
                                },
                                disabled: isAreaField ? true : subField.disabled,
                              }}
                            />
                            {/* Only show error for this row if touched or submitted and error exists */}
                            {showError(index) &&
                              form.formState.errors?.[field.name]?.[index]?.[subField.name] && (
                                <FormMessage name={`${field.name}.${index}.${subField.name}`} />
                              )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Button
                type="button"
                variant="outline"
                onClick={addItem}
                disabled={field.maxItems ? (formField.value || []).length >= field.maxItems : false}
                className="w-full"
              >
                <Plus className="mr-2 h-4 w-4" />
                {field.addButtonText || `Add ${field.label}`}
              </Button>
            </div>

            {/* Only show main error if the whole repeatable field is invalid and submitted */}
            {form.formState.isSubmitted && form.formState.errors[field.name] && <FormMessage />}
          </FormItem>
        )}
      />
    </div>
  );
};
