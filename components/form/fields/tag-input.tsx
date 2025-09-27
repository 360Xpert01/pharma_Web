import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { useState, KeyboardEvent } from "react";
import { BaseField } from "../base-field";
import { FormField } from "@/types/form";

export const TagsInputField = ({ field }: { field: FormField }) => {
  const [inputValue, setInputValue] = useState("");

  return (
    <BaseField
      field={field}
      renderInput={({
        onChange,
        value = [],
      }: {
        onChange: (value: string[]) => void;
        value?: string[];
      }) => {
        // Ensure value is always an array
        const tags = Array.isArray(value) ? value : [];

        const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
          const separator = field.separator || ",";

          if (e.key === "Enter" || e.key === separator) {
            e.preventDefault();
            addTag();
          } else if (e.key === "Backspace" && !inputValue && tags.length > 0) {
            e.preventDefault();
            // Remove last tag when backspace is pressed with empty input
            onChange(tags.slice(0, -1));
          }
        };

        const addTag = () => {
          const trimmedValue = inputValue.trim();
          if (trimmedValue && !tags.includes(trimmedValue)) {
            onChange([...tags, trimmedValue]);
            setInputValue("");
          }
        };

        const removeTag = (index: number) => {
          onChange(tags.filter((_, i) => i !== index));
        };

        return (
          <div className="space-y-2">
            {/* Tags display */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Badge
                    key={`${tag}-${index}`}
                    variant="secondary"
                    className="flex items-center px-2 py-1"
                  >
                    <span className="max-w-[200px] truncate">{tag}</span>
                    <button
                      type="button"
                      onClick={() => removeTag(index)}
                      className="ml-1 rounded-full hover:bg-accent"
                      aria-label={`Remove tag ${tag}`}
                    >
                      <X size={14} className="text-muted-foreground" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Input field */}
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => {
                if (field.addOnBlur && inputValue.trim()) {
                  addTag();
                }
              }}
              placeholder={field.placeholder || "Type and press enter to add"}
              className="mt-1"
            />

            {/* Help text */}
            {field.helpText && <p className="text-sm text-muted-foreground">{field.helpText}</p>}
          </div>
        );
      }}
    />
  );
};
