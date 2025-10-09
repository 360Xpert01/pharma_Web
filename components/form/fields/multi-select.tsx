import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CloseIcon } from "@/lib/icons";
import { Button } from "@/components/ui/button/button";
import { BaseField } from "../base-field";
import { FormField } from "@/types/form";

export const MultiSelectField = ({ field }: { field: FormField }) => {
  return (
    <BaseField
      field={field}
      renderInput={({ onChange, value = [] }: any) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-start w-full">
              <div className="flex flex-wrap gap-1">
                {value.length === 0 ? (
                  <span className="text-muted-foreground">
                    {field.placeholder || "Select options"}
                  </span>
                ) : (
                  value.map((val: string) => (
                    <Badge key={val} variant="secondary" className="flex items-center">
                      {field.options?.find((opt) => opt.value === val)?.label || val}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onChange(value.filter((v: string) => v !== val));
                        }}
                        className="ml-1"
                      >
                        <CloseIcon size={14} />
                      </button>
                    </Badge>
                  ))
                )}
              </div>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full">
            <div className="grid gap-2">
              {field.options?.map((option) => (
                <label key={option.value} className="flex items-center gap-2 cursor-pointer">
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
              ))}
            </div>
          </PopoverContent>
        </Popover>
      )}
    />
  );
};
