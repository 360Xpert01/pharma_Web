import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button/button";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarInputIcon } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { FormField } from "@/types/form";
import { BaseField } from "../base-field";
import { isValid, parseISO } from "date-fns";

export const DateField = ({ field }: { field: FormField }) => {
  return (
    <BaseField
      field={field}
      renderInput={({ onChange, value }: any) => {
        let displayValue = value;
        if (typeof value === "string" && value) {
          const parsed = parseISO(value);
          displayValue = isValid(parsed) ? parsed : null;
        } else if (value instanceof Date && !isValid(value)) {
          displayValue = null;
        }
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !displayValue && "text-muted-foreground"
                )}
              >
                <CalendarInputIcon className="mr-2 h-4 w-4" />
                {displayValue ? (
                  format(displayValue, "PPP")
                ) : (
                  <span>{field.placeholder || "Pick a date"}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={displayValue} onSelect={onChange} initialFocus />
            </PopoverContent>
          </Popover>
        );
      }}
    />
  );
};
