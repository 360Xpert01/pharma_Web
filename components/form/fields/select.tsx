import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BaseField } from "../base-field";
import { FormField } from "@/types/form";

export const SelectField = ({ field }: { field: FormField }) => {
  return (
    <BaseField
      field={field}
      renderInput={({ onChange, value }: any) => {
        // Convert value to string for the select component
        const stringValue = value?.toString() || "";

        const handleValueChange = (newValue: string) => {
          // Convert back to number if the field validation expects a number or a union/transform
          if (
            field.validation &&
            (field.validation._def?.typeName === "ZodNumber" ||
              field.validation._def?.typeName === "ZodUnion" ||
              field.validation._def?.typeName === "ZodEffects")
          ) {
            const numValue = newValue ? Number(newValue) : undefined;
            onChange(numValue);
          } else {
            onChange(newValue);
          }
        };

        return (
          <Select onValueChange={handleValueChange} value={stringValue}>
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      }}
    />
  );
};
