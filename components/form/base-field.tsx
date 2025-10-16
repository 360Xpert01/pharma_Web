import { FormField } from "@/types/form";
import {
  FormControl,
  FormDescription,
  FormField as ShadFormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { logger } from "@/logger/logger";
import { cn } from "@/lib/utils";
import { useCallback } from "react";

interface BaseFieldProps {
  field: FormField;
  renderInput: (props: any) => React.ReactNode;
}

export const BaseField: React.FC<BaseFieldProps> = ({ field, renderInput }) => {
  const form = useFormContext();

  const getSpanClasses = (span: number | { sm?: number; md?: number; lg?: number } | undefined) => {
    if (!span) return "";

    const spanMap = {
      1: "col-span-1",
      2: "col-span-2",
      3: "col-span-3",
      4: "col-span-4",
      5: "col-span-5",
      6: "col-span-6",
    };

    if (typeof span === "number") {
      return spanMap[span] || "";
    }

    const classes: string[] = [];

    // Apply base span (default to sm if not specified)
    const baseSpan = span.sm || span.md || span.lg || 1;
    classes.push(spanMap[baseSpan]);

    // Apply responsive spans
    if (span.sm) classes.push(`sm:${spanMap[span.sm]}`);
    if (span.md) classes.push(`md:${spanMap[span.md]}`);
    if (span.lg) classes.push(`lg:${spanMap[span.lg]}`);

    const result = classes.join(" ");
    logger.debug("Base field span classes calculated", {
      classes: result,
      fieldName: field.name,
      spanConfig: field.span,
    });
    return result;
  };

  const handleChange = useCallback(
    (value: any) => {
      form.setValue(field.name, value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    },
    [field.name, form]
  );

  return (
    <div className={cn(getSpanClasses(field.span))}>
      <ShadFormField
        control={form.control}
        name={field.name}
        render={({ field: formField }) => (
          <FormItem
            className={
              field.type === "toggle" || field.type === "checkbox"
                ? "flex flex-row items-center justify-between space-x-2 space-y-0"
                : ""
            }
          >
            <FormLabel
              className={field.type === "toggle" || field.type === "checkbox" ? "text-base" : ""}
            >
              {field.label}
              {/* {field.required && <span className="text-destructive">*</span>} */}
            </FormLabel>
            <FormControl>
              {renderInput({
                ...formField,
                onChange: handleChange,
                className: cn("bg-background", field.className),
              })}
            </FormControl>
            {field.description && <FormDescription>{field.description}</FormDescription>}
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
