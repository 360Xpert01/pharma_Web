import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormField } from "@/types";
import { useBaseForm } from "@/hooks/use-base-form";
import { InputField } from "./fields/input";
import { SelectField } from "./fields/select";
import { MultiSelectField } from "./fields/multi-select";
import { CheckboxField } from "./fields/checkbox";
import { FileField } from "./fields/file-upload";
import { DateField } from "./fields/date-input";
import { TagsInputField } from "./fields/tag-input";
import { DynamicSelectField } from "./fields/dynamic-select";
import { RichTextField } from "./fields/text-editor";
import { FormWrapper } from "./form-wrapper";
import { LoadingIcon } from "@/lib/icons";
import { TextareaField } from "./fields/textarea";
import { ToggleField } from "./fields/toggle";
import { ColorField } from "./fields/color-picker";
import { RadioGroupField } from "./fields/radio-group";
import { RangeField } from "./fields/range-field";
import { RepeatableField } from "./fields/repeatable-field";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";

const FieldComponents: Record<string, React.ComponentType<{ field: FormField }>> = {
  // Basic fields
  text: InputField,
  email: InputField,
  password: InputField,
  number: InputField,
  "datetime-local": InputField,
  textarea: TextareaField,

  // Selection fields
  select: SelectField,
  multiselect: MultiSelectField,
  radio: RadioGroupField,
  checkbox: CheckboxField,
  toggle: ToggleField,
  // combobox: ComboboxField,

  // Special inputs
  file: FileField,
  date: DateField,
  range: RangeField,
  color: ColorField,
  tags: TagsInputField,

  // Rich content
  richtext: RichTextField,

  // Dynamic fields
  dynamicselect: DynamicSelectField,

  // Repeatable fields
  repeatable: RepeatableField,
};

interface BaseFormProps {
  // Primary schema object (existing API)
  schema?: {
    fields: FormField[];
    onSubmit: (data: any) => void;
    defaultValues?: Record<string, any>;
    validationSchema?: any;
  };
  // Convenience top-level props (shorthand)
  fields?: FormField[];
  onSubmit?: (data: any) => void;
  defaultValues?: Record<string, any>;
  validationSchema?: any;

  submitText?: string;
  className?: string;
  submitButtonProps?: React.ComponentProps<typeof Button>;
  renderSubmitButton?: (props: { isLoading: boolean; isSubmitting: boolean }) => React.ReactNode;
  loading?: boolean;
  isEditMode?: boolean;
  /** Enable scrollable content for long forms with better UI scrollbars */
  scrollable?: boolean;
  /** Maximum height for scrollable content (default: '80vh') */
  maxHeight?: string;
}

export const BaseForm: React.FC<BaseFormProps> = ({
  schema,
  fields,
  onSubmit: onSubmitProp,
  defaultValues,
  validationSchema,
  submitText = "Submit",
  className = "",
  submitButtonProps = {},
  renderSubmitButton,
  loading = false,
  isEditMode = false,
  scrollable = false,
  maxHeight = "80vh",
}) => {
  // Normalize schema: prefer full schema prop, else build from shorthand props
  const normalizedSchema = schema
    ? schema
    : {
        fields: fields || [],
        onSubmit: onSubmitProp || (() => {}),
        defaultValues: defaultValues || {},
        validationSchema: validationSchema,
      };

  const {
    form,
    fields: resolvedFields,
    onSubmit,
    isSubmitting,
    isLoading,
  } = useBaseForm(normalizedSchema);

  // Combined loading state
  const isFormLoading = loading || isLoading;

  const formContent = (
    <>
      {isFormLoading ? (
        <div className="flex h-64 items-center justify-center">
          <LoadingIcon className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <>
          {resolvedFields.map((field) => {
            if (field.type === "section") {
              return (
                <FormWrapper key={field.id} field={field}>
                  {field.fields?.map((nestedField: FormField) => {
                    const FieldComponent =
                      FieldComponents[nestedField.type] || FieldComponents.text;
                    return <FieldComponent key={nestedField.id} field={nestedField} />;
                  })}
                </FormWrapper>
              );
            }

            const FieldComponent = FieldComponents[field.type] || FieldComponents.text;
            return <FieldComponent key={field.id} field={field} />;
          })}

          {renderSubmitButton ? (
            renderSubmitButton({
              isLoading: isFormLoading,
              isSubmitting,
            })
          ) : (
            <Button
              type="submit"
              className="w-full"
              disabled={isFormLoading || isSubmitting}
              {...submitButtonProps}
            >
              {isSubmitting ? (
                <>
                  <LoadingIcon className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                submitText
              )}
            </Button>
          )}
        </>
      )}
    </>
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={`space-y-6 ${className}`} noValidate>
        {scrollable ? (
          <div style={{ height: maxHeight }}>
            <ScrollArea className="h-full w-full">
              <div className="space-y-6 pr-4">{formContent}</div>
            </ScrollArea>
          </div>
        ) : (
          formContent
        )}
      </form>
    </Form>
  );
};

export default BaseForm;
