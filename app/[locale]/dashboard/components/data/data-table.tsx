"use client";
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";
import {
  SearchInputIcon,
  FilterIcon,
  DownloadIcon,
  MoreIcon,
  SortIcon,
  UpIcon,
  UploadIcon,
  DownIcon,
} from "@/lib/icons";
import { DataTableProps, SortDirection, FilterOption } from "../../types";
import { DataTableSkeleton } from "../loading/dashboard-loading";

export function DataTable<T extends Record<string, any>>({
  title,
  description,
  data,
  columns,
  icon: Icon,
  searchKey,
  filterOptions,
  isLoading = false,
}: DataTableProps<T>) {
  const t = useTranslations("dashboard");
  const tShared = useTranslations("shared");

  const [searchTerm, setSearchTerm] = useState("");
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [filterValue, setFilterValue] = useState<any>(null);

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    // Search filtering
    if (searchTerm && searchKey) {
      result = result.filter((item) =>
        String(item[searchKey]).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by specific value
    if (filterValue !== null && filterOptions) {
      result = result.filter((item) => item[filterOptions.key] === filterValue);
    }

    // Sorting
    if (sortColumn && sortDirection) {
      result.sort((a, b) => {
        const aVal = a[sortColumn];
        const bVal = b[sortColumn];

        if (typeof aVal === "number" && typeof bVal === "number") {
          return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
        }

        const aStr = String(aVal).toLowerCase();
        const bStr = String(bVal).toLowerCase();

        if (sortDirection === "asc") {
          return aStr.localeCompare(bStr);
        } else {
          return bStr.localeCompare(aStr);
        }
      });
    }

    return result;
  }, [data, searchTerm, searchKey, sortColumn, sortDirection, filterValue, filterOptions]);

  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : sortDirection === "desc" ? null : "asc");
      if (sortDirection === "desc") {
        setSortColumn(null);
      }
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (column: keyof T) => {
    if (sortColumn !== column) return <SortIcon className="h-4 w-4" />;
    if (sortDirection === "asc") return <UpIcon className="h-4 w-4" />;
    if (sortDirection === "desc") return <DownIcon className="h-4 w-4" />;
    return <SortIcon className="h-4 w-4" />;
  };

  const getStatusBadge = (status: string) => {
    const statusColors = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
      completed: "bg-green-100 text-green-800",
      processing: "bg-blue-100 text-blue-800",
      cancelled: "bg-red-100 text-red-800",
    };

    return (
      <Badge
        className={statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"}
      >
        {status}
      </Badge>
    );
  };

  if (isLoading) {
    return <DataTableSkeleton />;
  }
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <CardTitle>{title}</CardTitle>
            </div>

            <div className="flex items-center gap-4 ">
              {searchKey && (
                <div className="relative bg-white flex-1 max-w-sm">
                  <SearchInputIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder={t("placeholders.search")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              )}

              {filterOptions && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <FilterIcon className="h-6 w-4 " />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Filter by {filterOptions.key as string}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setFilterValue(null)}>All</DropdownMenuItem>
                    {filterOptions.options.map((option) => (
                      <DropdownMenuItem
                        key={option.value}
                        onClick={() => setFilterValue(option.value)}
                      >
                        {option.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              <div>
                <Button variant="outline" size="sm">
                  <UploadIcon className="h-4 w-4 mr-2" />
                  {t("actions.export")}
                </Button>
              </div>
            </div>
          </div>

          {/* Add description here */}
          {description && <p className="text-sm text-gray-600">{description}</p>}
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md shadow-md ">
          <Table>
            <TableHeader>
              <TableRow>
                {/* {columns.map((column) => (
                  <TableHead
                    key={String(column.key)}
                    className={column.sortable ? "cursor-pointer select-none" : ""}
                    onClick={column.sortable ? () => handleSort(column.key) : undefined}
                  >
                    <div className="flex text-black items-center gap-2">
                      {column.label}
                      {column.sortable && getSortIcon(column.key)}
                    </div>
                  </TableHead>
                ))} */}
                {/* <TableHead>{t("table.headers.actions")}</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedData.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + 1} className="text-center py-8">
                    {t("table.noData")}
                  </TableCell>
                </TableRow>
              ) : (
                filteredAndSortedData.map((item, index) => (
                  <TableRow key={index}>
                    {columns.map((column) => (
                      <TableCell key={String(column.key)}>
                        {column.render
                          ? column.render(item[column.key], item)
                          : String(item[column.key])}
                      </TableCell>
                    ))}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreIcon className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>{tShared("actions.edit")}</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            {tShared("actions.delete")}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
