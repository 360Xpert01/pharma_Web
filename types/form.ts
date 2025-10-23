import { FieldError, Control, FieldValues, Path } from "react-hook-form";
import { ReactNode } from "react";

// Field option interface
export interface FieldOption {
  label: string;
  value: any;
  disabled?: boolean;
}

// Base form field interface
export interface FormField {
  id: string;
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  description?: string;
  error?: FieldError;
  className?: string;

  // Field-specific configurations
  type: string;
  options?: Array<{ label: string; value: any; disabled?: boolean }>;
  multiple?: boolean;
  searchable?: boolean;
  clearable?: boolean;
  defaultValue?: any;

  // Dynamic select specific
  dependsOn?: string[];
  loadOptions?: (dependencies: Record<string, any>) => Promise<FieldOption[]>;

  // Section/wrapper specific
  fields?: FormField[];
  defaultOpen?: boolean;
  collapsible?: boolean;

  // Repeatable field specific
  minItems?: number;
  maxItems?: number;
  addButtonText?: string;
  removeButtonText?: string;
  sortable?: boolean;

  // Validation
  validation?: {
    required?: boolean | string;
    min?: number | string;
    max?: number | string;
    minLength?: number | string;
    maxLength?: number | string;
    pattern?: RegExp | string;
    validate?: (value: any) => boolean | string;
  };

  // Layout and styling
  span?: number | { sm?: number; md?: number; lg?: number };
  grid?: {
    columns?: number | { sm?: number; md?: number; lg?: number };
    gap?: string | number;
  };

  // Conditional rendering
  condition?: {
    field: string;
    value: any;
    operator?: "equals" | "not_equals" | "contains" | "greater_than" | "less_than";
  };

  // Field-specific props
  [key: string]: any;
}

// Form configuration interface
export interface FormConfig {
  fields: FormField[];
  layout?: "vertical" | "horizontal" | "grid";
  submitButton?: {
    text?: string;
    loading?: boolean;
    disabled?: boolean;
    className?: string;
  };
  resetButton?: {
    text?: string;
    className?: string;
  };
  onSubmit?: (data: any) => void | Promise<void>;
  onReset?: () => void;
  defaultValues?: Record<string, any>;
  mode?: "onChange" | "onBlur" | "onSubmit";
}

// Form field component props
export interface FormFieldProps<T extends FieldValues = FieldValues> {
  field: FormField;
  control: Control<T>;
  name: Path<T>;
  error?: FieldError;
  className?: string;
  children?: ReactNode;
}

// Form wrapper props
export interface FormWrapperProps {
  config: FormConfig;
  className?: string;
  children?: ReactNode;
}

// Repeatable field configuration
export interface RepeatableFieldConfig extends FormField {
  type: "repeatable";
  fields: FormField[];
  minItems?: number;
  maxItems?: number;
  addButtonText?: string;
  removeButtonText?: string;
  sortable?: boolean;
}

// Dynamic select field configuration
export interface DynamicSelectConfig extends FormField {
  type: "dynamicselect";
  endpoint?: string;
  searchParam?: string;
  valueField?: string;
  labelField?: string;
  searchable?: boolean;
  multiple?: boolean;
  loadOnMount?: boolean;
}

export default FormField;
