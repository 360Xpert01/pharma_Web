import { TiptapEditor } from "@/components/ui/tiptap-editor";
import { FormField } from "@/types";
import { BaseField } from "../base-field";

export const RichTextField = ({ field }: { field: FormField }) => {
  return (
    <BaseField
      field={field}
      renderInput={({ onChange, value }: any) => (
        <TiptapEditor content={value || ""} onChange={onChange} placeholder={field.placeholder} />
      )}
    />
  );
};
