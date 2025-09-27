import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Loader2, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FormField, FieldOption } from "@/types/form";
import { BaseField } from "../base-field";

export const DynamicSelectField = ({ field }: { field: FormField }) => {
  const [options, setOptions] = useState<FieldOption[]>(field.options || []);
  const [loading, setLoading] = useState(false);
  const form = useFormContext();

  const watchedValues = field.dependsOn?.map((dep) => form.watch(dep)) || [];

  useEffect(() => {
    if (field.loadOptions) {
      const dependencies = field.dependsOn?.reduce((acc, dep) => {
        return { ...acc, [dep]: form.getValues(dep) };
      }, {});

      setLoading(true);
      field
        .loadOptions(dependencies || {})
        .then(setOptions)
        .finally(() => setLoading(false));
    }
  }, [field.loadOptions, ...watchedValues]);

  return (
    <BaseField
      field={field}
      renderInput={({ onChange, value = field.multiple ? [] : "" }: any) =>
        field.multiple ? (
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                <div className="flex flex-wrap gap-1">
                  {value.length === 0 ? (
                    <span className="text-muted-foreground">
                      {loading ? (
                        <span className="flex items-center">
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Loading
                        </span>
                      ) : (
                        field.placeholder || "Select options"
                      )}
                    </span>
                  ) : (
                    value.map((val: string) => (
                      <Badge key={val} variant="secondary" className="flex items-center">
                        {options.find((opt) => opt.value === val)?.label || val}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onChange(value.filter((v: string) => v !== val));
                          }}
                          className="ml-1"
                        >
                          <X size={14} />
                        </button>
                      </Badge>
                    ))
                  )}
                </div>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="max-h-64 w-full overflow-y-auto">
              <div className="grid gap-2">
                {loading ? (
                  <div className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading
                  </div>
                ) : (
                  options.map((option) => (
                    <label key={option.value} className="flex cursor-pointer items-center gap-2">
                      <Checkbox
                        checked={value.includes(option.value)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            onChange([...value, option.value]);
                          } else {
                            onChange(value.filter((v: string) => v !== option.value));
                          }
                        }}
                      />
                      {option.label}
                    </label>
                  ))
                )}
              </div>
            </PopoverContent>
          </Popover>
        ) : (
          <Select onValueChange={onChange} value={value} disabled={loading}>
            <SelectTrigger>
              {loading ? (
                <div className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading
                </div>
              ) : (
                <SelectValue placeholder={field.placeholder} />
              )}
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )
      }
    />
  );
};
