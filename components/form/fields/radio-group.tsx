import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { FormField } from "@/types/form";
import { BaseField } from "../base-field";

export const RadioGroupField = ({ field }: { field: FormField }) => {
  return (
    <BaseField
      field={field}
      renderInput={({ onChange, value }: any) => (
        <RadioGroup value={value} onValueChange={onChange} className="gap-2">
          {field.options?.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      )}
    />
  );
};
