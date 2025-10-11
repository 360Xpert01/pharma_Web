import React, { useCallback, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "use-debounce";

type FilterComponentProps<T> = {
  value: T;
  onChange: (value: T) => void;
  [key: string]: any;
};

type FilterWrapperProps<T> = {
  filterKey: string;
  initialValue: T;
  debounceTime?: number;
  children: (props: FilterComponentProps<T>) => React.ReactNode;
  resetPage?: boolean;
  placeholder?: string;
  [key: string]: any;
};

export function FilterWrapper<T>({
  filterKey,
  initialValue,
  debounceTime = 300,
  children,
  resetPage = true,
  ...props
}: FilterWrapperProps<T>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const urlValue = searchParams.get(filterKey);

  // Parse initial value from URL or use provided initialValue
  const parsedInitialValue = urlValue ? (urlValue as T) : initialValue;
  const [value, setValue] = React.useState<T>(parsedInitialValue);
  const [debouncedValue] = useDebounce(value, debounceTime);

  const updateSearchParams = useCallback(
    (newValue: T) => {
      const params = new URLSearchParams(searchParams.toString());

      if (
        newValue === null ||
        newValue === undefined ||
        (typeof newValue === "string" && newValue === "") ||
        (Array.isArray(newValue) && newValue.length === 0)
      ) {
        params.delete(filterKey);
      } else {
        // Store simple values directly without JSON.stringify
        params.set(filterKey, String(newValue));
      }

      if (resetPage) {
        params.set("page", "1");
      }

      const newUrl = `${window.location.pathname}?${params.toString()}`;
      router.push(newUrl, { scroll: false });
    },
    [filterKey, resetPage, searchParams, router]
  );

  useEffect(() => {
    updateSearchParams(debouncedValue);
  }, [debouncedValue, updateSearchParams]);

  useEffect(() => {
    const currentValue = searchParams.get(filterKey);
    if (currentValue !== String(value)) {
      setValue((currentValue as T) || initialValue);
    }
  }, [filterKey, searchParams, initialValue, value]);

  return (
    <>
      {children({
        value,
        onChange: setValue,
        ...props,
      })}
    </>
  );
}
