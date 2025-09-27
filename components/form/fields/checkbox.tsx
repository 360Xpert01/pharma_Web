import { Checkbox } from "@/components/ui/checkbox";
import { FormField } from "@/types/form";
import { BaseField } from "../base-field";

export const CheckboxField = ({ field }: { field: FormField }) => {
  return (
    <BaseField
      field={field}
      renderInput={({ onChange, value }: any) => (
        <Checkbox
          checked={!!value}
          onCheckedChange={(checked) => {
            onChange(!!checked);
          }}
        />
      )}
    />
  );
};
