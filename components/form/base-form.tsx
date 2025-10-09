import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FormField } from "@/types/form";
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
import currencies from "@/constants/currencies";

// Custom Currency Symbol Field Component
const CurrencySymbolField: React.FC<{ field: FormField }> = ({ field }) => {
  const form = useFormContext();
  const currencyValue = form.watch("currency");

  // Get currency symbol by currency code
  const getCurrencySymbol = (currencyCode: string): string => {
    const currency = currencies.find((c) => c.code === currencyCode);
    return currency ? currency.symbol : "€";
  };

  // Update currency symbol when currency changes
  useEffect(() => {
    const currencySymbol = getCurrencySymbol(currencyValue);
    form.setValue("currencySymbol", currencySymbol);
  }, [currencyValue, form]);

  const currencySymbol = getCurrencySymbol(currencyValue);

  return (
    <div>
      <label className="text-sm font-medium">{field.label} *</label>
      <input
        type="text"
        value={currencySymbol}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        disabled
        readOnly
      />
      <p className="mt-1 text-xs text-muted-foreground">
        Automatically set based on selected currency
      </p>
    </div>
  );
};

const FieldComponents = {
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

  // Custom fields for settings
  "currency-symbol": CurrencySymbolField,
};

interface BaseFormProps {
  schema: {
    fields: FormField[];
    onSubmit: (data: any) => void;
    defaultValues?: Record<string, any>;
    validationSchema?: any;
  };
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
  submitText = "Submit",
  className = "",
  submitButtonProps = {},
  renderSubmitButton,
  loading = false,
  isEditMode = false,
  scrollable = false,
  maxHeight = "80vh",
}) => {
  const { form, fields, onSubmit, isSubmitting, isLoading } = useBaseForm(schema);

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
          {fields.map((field) => {
            if (field.type === "section") {
              return (
                <FormWrapper key={field.id} field={field}>
                  {field.fields?.map((nestedField) => {
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
