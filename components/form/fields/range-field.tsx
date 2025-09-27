import { Slider } from "@/components/ui/slider";
import { FormField } from "@/types/form";
import { BaseField } from "../base-field";

export const RangeField = ({ field }: { field: FormField }) => {
  return (
    <BaseField
      field={field}
      renderInput={({ onChange, value }: any) => (
        <div className="space-y-2">
          <Slider
            min={field.min}
            max={field.max}
            step={field.step}
            value={[value || field.min || 0]}
            onValueChange={(vals) => onChange(vals[0])}
          />
          <div className="text-sm text-muted-foreground">Current value: {value}</div>
        </div>
      )}
    />
  );
};
