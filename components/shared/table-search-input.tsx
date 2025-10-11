import React, { useCallback } from "react";
import { Input } from "../ui/input";
import { useDebounce } from "use-debounce";
import { useSearchParams } from "react-router-dom";

export default function TableSearchInput({ placeholder }: { placeholder?: string }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = React.useState(search);
  // debounce the search input
  const [debouncedValue] = useDebounce(searchTerm, 1000);
  const handleSettingSearchParams = useCallback((newSearchValue: string) => {
    // Update the URL with the new search value
    if (newSearchValue === "" || newSearchValue === undefined || !newSearchValue) {
      searchParams.delete("search");
      setSearchParams(searchParams);
      return;
    }
    setSearchParams({
      ...Object.fromEntries(searchParams),
      page: "1", // Spread the existing search params
      search: newSearchValue, // Update the search value
    });
  }, []);

  React.useEffect(() => {
    handleSettingSearchParams(debouncedValue);
  }, [debouncedValue, handleSettingSearchParams]);

  // Sync search term when URL changes
  React.useEffect(() => {
    setSearchTerm(search);
  }, [search]);
  return (
    <Input
      placeholder={placeholder || `Search...`}
      value={searchTerm}
      onChange={(event) => setSearchTerm(event.target.value)}
      className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg"
    />
  );
}
