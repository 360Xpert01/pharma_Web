"use client";

import { useState, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { PaginationState, DataTableSearchParams } from "@/types/shared";

interface UseDataTableProps {
  defaultPageSize?: number;
  defaultPage?: number;
}

export function useDataTable({ defaultPageSize = 10, defaultPage = 1 }: UseDataTableProps = {}) {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Parse search params
  const parsedParams = useMemo((): DataTableSearchParams => {
    const page = searchParams.get("page") ?? defaultPage.toString();
    const limit = searchParams.get("limit") ?? defaultPageSize.toString();
    const search = searchParams.get("search") ?? undefined;
    const sort = searchParams.get("sort") ?? undefined;
    const filter = searchParams.get("filter") ?? undefined;

    return { page, limit, search, sort, filter };
  }, [searchParams, defaultPageSize, defaultPage]);

  // Validate and fallback values
  const pageAsNumber = Number(parsedParams.page);
  const fallbackPage = isNaN(pageAsNumber) || pageAsNumber < 1 ? 1 : pageAsNumber;

  const limitAsNumber = Number(parsedParams.limit);
  const fallbackLimit = isNaN(limitAsNumber) || limitAsNumber < 1 ? defaultPageSize : limitAsNumber;

  // Pagination state
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: fallbackPage - 1,
    pageSize: fallbackLimit,
  });

  // Update URL when pagination changes
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", (pagination.pageIndex + 1).toString());
    params.set("limit", pagination.pageSize.toString());

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.replace(newUrl, { scroll: false });
  }, [pagination, router, searchParams]);

  // Update search params helper
  const updateSearchParams = (updates: Partial<DataTableSearchParams>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        params.set(key, value.toString());
      } else {
        params.delete(key);
      }
    });

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.replace(newUrl, { scroll: false });
  };

  return {
    pagination,
    setPagination,
    searchParams: parsedParams,
    updateSearchParams,
  };
}
