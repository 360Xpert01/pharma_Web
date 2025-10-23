// src/components/form/fields/FileField.tsx
import { Input } from "@/components/ui/input";
import { FormField } from "@/types";
import { BaseField } from "../base-field";

export const FileField = ({ field }: { field: FormField }) => {
  return (
    <BaseField
      field={field}
      renderInput={({ onChange }: any) => (
        <Input
          type="file"
          accept={field.accept}
          multiple={field.multiple}
          onChange={(e) => onChange(e.target.files)}
        />
      )}
    />
  );
};
