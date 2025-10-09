import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button/button";
import { HexColorPicker } from "react-colorful";

import { FormField } from "@/types/form";
import { BaseField } from "../base-field";
export const ColorField = ({ field }: { field: FormField }) => {
  return (
    <BaseField
      field={field}
      renderInput={({ onChange, value }: any) => (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              <div
                className="w-4 h-4 rounded-full mr-2 border"
                style={{ backgroundColor: value || "#000000" }}
              />
              {value || "Select color"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <HexColorPicker color={value} onChange={onChange} />
          </PopoverContent>
        </Popover>
      )}
    />
  );
};
