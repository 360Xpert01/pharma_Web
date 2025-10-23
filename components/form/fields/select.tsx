import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BaseField } from "../base-field";
import { FormField } from "@/types";

export const SelectField = ({ field }: { field: FormField }) => {
  return (
    <BaseField
      field={field}
      renderInput={({ onChange, value }: any) => {
        // Convert value to string for the select component
        const stringValue = value?.toString() || "";

        const handleValueChange = (newValue: string) => {
          // Check if we need to convert to number based on field type or options
          const shouldConvertToNumber = field.options?.some(
            (option) => typeof option.value === "number"
          );

          if (shouldConvertToNumber && newValue !== "") {
            const numValue = Number(newValue);
            onChange(isNaN(numValue) ? newValue : numValue);
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
                <SelectItem key={option.value} value={String(option.value)}>
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
