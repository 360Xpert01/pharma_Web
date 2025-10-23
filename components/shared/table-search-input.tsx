import React, { useCallback } from "react";
import { Input } from "../ui/input";
import { useDebounce } from "use-debounce";
import { useSearchParams, useRouter } from "next/navigation";

export default function TableSearchInput({ placeholder }: { placeholder?: string }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const search = searchParams.get("search") || "";
  const [searchTerm, setSearchTerm] = React.useState(search);
  // debounce the search input
  const [debouncedValue] = useDebounce(searchTerm, 1000);

  const handleSettingSearchParams = useCallback(
    (newSearchValue: string) => {
      const params = new URLSearchParams(searchParams);

      // Update the URL with the new search value
      if (newSearchValue === "" || newSearchValue === undefined || !newSearchValue) {
        params.delete("search");
      } else {
        params.set("page", "1"); // Reset to first page
        params.set("search", newSearchValue);
      }

      router.push(`?${params.toString()}`);
    },
    [searchParams, router]
  );

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
