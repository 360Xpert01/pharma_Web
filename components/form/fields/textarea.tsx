import { Textarea } from "@/components/ui/textarea";
import { FormField } from "@/types";
import { BaseField } from "../base-field";

export const TextareaField = ({ field }: { field: FormField }) => {
  return (
    <BaseField
      field={field}
      renderInput={({ onChange, value, ...props }: any) => (
        <Textarea
          placeholder={field.placeholder}
          onChange={(e) => onChange(e.target.value)}
          value={value || ""}
          rows={field.rows || 4}
          {...props}
        />
      )}
    />
  );
};
