import { useState } from "react";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandItem,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { LoadingIcon, SearchInputIcon, CloseIcon } from "@/lib/icons";
import { Controller, FieldValues, useController, UseControllerProps, Path } from "react-hook-form";
import { cn } from "@/lib/utils";

type Props<T extends FieldValues> = {
  placeholder: string;
  values: { [key: string]: any }[] | string[] | undefined;
  outputField?: string;
  displayField?: string | string[];
  className?: string;
  isString?: boolean;
  label: string;
  allowClear?: boolean;
  isLoading?: boolean;
  search?: boolean;
  name?: Path<T>;
  control?: UseControllerProps<T>["control"];
  rules?: UseControllerProps<T>["rules"];
  value?: any;
  onChange?: (value: any) => void;
};

// Wrapper component to handle conditional useController
const SearchableSelectWithController = <T extends FieldValues>({
  placeholder,
  label,
  name,
  control,
  isString = true,
  className,
  values = [],
  outputField = "id",
  displayField = "name",
  rules,
  allowClear = false,
  isLoading = false,
  search = true,
  value: externalValue,
  onChange: externalOnChange,
}: Props<T>) => {
  const controller = useController({
    name: name as Path<T>,
    control: control!,
    rules,
  });

  return (
    <SearchableSelectBase
      placeholder={placeholder}
      label={label}
      isString={isString}
      className={className}
      values={values}
      outputField={outputField}
      displayField={displayField}
      allowClear={allowClear}
      isLoading={isLoading}
      search={search}
      value={controller.field.value}
      onChange={controller.field.onChange}
      invalid={controller.fieldState.invalid}
      error={controller.fieldState.error}
    />
  );
};

// Base component without controller
const SearchableSelectBase = ({
  placeholder,
  label,
  isString = true,
  className,
  values = [],
  outputField = "id",
  displayField = "name",
  allowClear = false,
  isLoading = false,
  search = true,
  value: externalValue,
  onChange: externalOnChange,
  invalid = false,
  error = undefined,
}: Omit<Props<any>, "name" | "control" | "rules"> & {
  invalid?: boolean;
  error?: any;
}) => {
  const [internalValue, setInternalValue] = useState<any>(externalValue);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);

  const value = externalValue !== undefined ? externalValue : internalValue;

  const onChange = (newValue: any) => {
    if (externalOnChange) {
      externalOnChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  const formattedValues = (values || []).map((v) =>
    typeof v === "object" ? v : { [outputField]: v, [displayField.toString()]: v }
  );

  const filteredValues = formattedValues?.filter((v: any) => {
    if (!search) return true; // If search is disabled, show all values

    const displayText = Array.isArray(displayField)
      ? displayField.map((field) => v[field]).join(" ")
      : v[displayField];
    return displayText?.toString().toLowerCase().includes(searchQuery.toLowerCase());
  });

  const handleSelect = (selectedValue: any) => {
    const newValue = isString ? selectedValue?.toString() : Number(selectedValue);
    onChange(newValue);
    setOpen(false);
    setSearchQuery("");
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(undefined);
  };

  const selectedItem = formattedValues?.find(
    (v) => v[outputField]?.toString() === value?.toString()
  );

  const displayText = selectedItem
    ? Array.isArray(displayField)
      ? displayField.map((field) => selectedItem[field]).join(" ")
      : selectedItem[displayField]
    : placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className={cn("w-full", className)} asChild>
        <div
          className={cn(
            "relative flex min-h-[36px] w-full cursor-pointer items-center justify-between rounded-sm border bg-(--background) p-2 dark:bg-gray-800",
            invalid && "border-red-500"
          )}
        >
          <span className="truncate pr-12 text-gray-700 dark:text-gray-300">{displayText}</span>
          <div className="absolute right-2 flex items-center gap-1">
            {allowClear && value && (
              <CloseIcon
                size={14}
                className="cursor-pointer text-gray-400 transition-colors hover:text-red-500"
                onClick={handleClear}
              />
            )}
            <SearchInputIcon size={14} className="text-gray-400" />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        className="w-[var(--radix-popover-trigger-width)] rounded-lg border bg-(--background) p-0 shadow-soft dark:border-gray-700 dark:bg-gray-900"
        align="start"
      >
        <Command className="w-full">
          {search && (
            <div className="flex items-center border-b dark:border-gray-700">
              <SearchInputIcon size={16} className="ml-2 text-gray-400" />
              <CommandInput
                placeholder="Search..."
                value={searchQuery}
                onValueChange={setSearchQuery}
                className="p-2"
              />
            </div>
          )}
          <CommandList className="max-h-60 overflow-y-auto">
            {isLoading && (
              <div className="flex items-center justify-center p-4 text-gray-500 dark:text-gray-400">
                <LoadingIcon className="animate-spin" />
              </div>
            )}

            {!isLoading && (
              <>
                <CommandEmpty className="p-2 text-gray-500 dark:text-gray-400">
                  No results found.
                </CommandEmpty>

                {filteredValues.map((e: any) => {
                  const displayText = Array.isArray(displayField)
                    ? displayField.map((field) => e[field]).join(" ")
                    : e[displayField];

                  return (
                    <CommandItem
                      key={e[outputField]}
                      value={e[outputField]?.toString()}
                      onSelect={() => handleSelect(e[outputField])}
                      className="!cursor-pointer rounded-md p-2"
                    >
                      {displayText}
                    </CommandItem>
                  );
                })}
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

// Main component that decides which version to use
const SearchableSelect = <T extends FieldValues>(props: Props<T>) => {
  const { name, control } = props;

  // If both name and control are provided, use the controller version
  if (name && control) {
    return <SearchableSelectWithController {...props} />;
  }

  // Otherwise, use the base version without controller
  return <SearchableSelectBase {...props} />;
};

export default SearchableSelect;
