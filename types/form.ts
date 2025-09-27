import { z } from "zod";

export type FieldType =
  | "text"
  | "number"
  | "email"
  | "password"
  | "select"
  | "multiselect"
  | "checkbox"
  | "radio"
  | "textarea"
  | "file"
  | "date"
  | "time"
  | "datetime-local"
  | "color"
  | "richtext"
  | "toggle"
  | "range"
  | "tags"
  | "combobox"
  | "section"
  | "dynamicselect"
  | "repeatable"
  | "currency-symbol";

export type FieldOption = {
  label: string;
  value: string;
};

type AllowedZodTypes =
  | z.ZodString
  | z.ZodNumber
  | z.ZodDate
  | z.ZodEffects<any>
  | z.ZodOptional<any>
  | z.ZodNullable<any>
  | z.ZodAny
  | any;

export type DynamicOptionsFn = (inputValue: string) => Promise<FieldOption[]>;
export type LoadOptionsFn = (dependencies: Record<string, any> | any) => Promise<FieldOption[]>;

export interface GridConfig {
  columns?: number | { sm?: number; md?: number; lg?: number };
  gap?: string | number;
}

export type FormField = {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  type: FieldType;
  required?: boolean;
  defaultValue?: any;
  disabled?: boolean;
  options?: FieldOption[];
  multiple?: boolean;
  accept?: string;
  validation?: AllowedZodTypes;
  className?: string;
  description?: string;
  rows?: number;
  dynamicOptions?: DynamicOptionsFn;
  loadOptions?: LoadOptionsFn;
  condition?: (values: Record<string, any>) => boolean;
  dependsOn?: string[];
  min?: number;
  max?: number;
  step?: number;
  creatable?: boolean;
  separator?: string;
  addOnBlur?: boolean;
  helpText?: string;
  span?: number | { sm?: number; md?: number; lg?: number };
  icon?: React.ReactNode;
} & (
  | {
      type: "section";
      fields: FormField[];
      defaultOpen?: boolean;
      collapsible?: boolean;
      grid?: GridConfig;
    }
  | {
      type: "repeatable";
      fields: FormField[];
      defaultOpen?: boolean;
      collapsible?: boolean;
      grid?: GridConfig;
      addButtonText?: string;
      removeButtonText?: string;
      minItems?: number;
      maxItems?: number;
    }
  | { type: Exclude<FieldType, "section" | "repeatable"> }
);

export type FormSchema = {
  fields: FormField[];
  onSubmit: (data: any) => void;
  defaultValues?: Record<string, any>;
  onChange?: (values: any) => void;
  validationSchema?: any;
};
