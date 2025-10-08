"use client";
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  DownIcon,
  UsersIcon,
  BagIcon,
  UserCheckIcon,
} from "@/lib/icons";

interface User {
  id: string;
  name: string;
  email: string;
  status: "active" | "inactive" | "pending";
  role: string;
  createdAt: string;
  lastLogin: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
  date: string;
  status: "completed" | "processing" | "cancelled";
}

interface Order {
  id: string;
  customer: string;
  email: string;
  total: number;
  status: "completed" | "processing" | "pending" | "cancelled";
  date: string;
}

// Sample data
const sampleUsers: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    status: "active",
    role: "Admin",
    createdAt: "2024-01-15",
    lastLogin: "2024-09-27",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    status: "active",
    role: "User",
    createdAt: "2024-02-20",
    lastLogin: "2024-09-26",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    status: "inactive",
    role: "User",
    createdAt: "2024-01-30",
    lastLogin: "2024-09-20",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice@example.com",
    status: "pending",
    role: "Moderator",
    createdAt: "2024-03-10",
    lastLogin: "Never",
  },
  {
    id: "5",
    name: "Charlie Wilson",
    email: "charlie@example.com",
    status: "active",
    role: "User",
    createdAt: "2024-02-05",
    lastLogin: "2024-09-27",
  },
];

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 299.99,
    quantity: 25,
    total: 7499.75,
    date: "2024-09-27",
    status: "completed",
  },
  {
    id: "2",
    name: "Smartphone Case",
    price: 24.99,
    quantity: 150,
    total: 3748.5,
    date: "2024-09-26",
    status: "processing",
  },
  {
    id: "3",
    name: "Laptop Stand",
    price: 79.99,
    quantity: 45,
    total: 3599.55,
    date: "2024-09-25",
    status: "completed",
  },
  {
    id: "4",
    name: "USB Cable",
    price: 12.99,
    quantity: 200,
    total: 2598.0,
    date: "2024-09-24",
    status: "cancelled",
  },
  {
    id: "5",
    name: "Power Bank",
    price: 59.99,
    quantity: 75,
    total: 4499.25,
    date: "2024-09-23",
    status: "completed",
  },
];

const sampleOrders: Order[] = [
  {
    id: "ORD001",
    customer: "John Doe",
    email: "john@example.com",
    total: 299.99,
    status: "completed",
    date: "2024-09-27",
  },
  {
    id: "ORD002",
    customer: "Jane Smith",
    email: "jane@example.com",
    total: 149.5,
    status: "processing",
    date: "2024-09-26",
  },
  {
    id: "ORD003",
    customer: "Bob Johnson",
    email: "bob@example.com",
    total: 75.25,
    status: "pending",
    date: "2024-09-25",
  },
  {
    id: "ORD004",
    customer: "Alice Brown",
    email: "alice@example.com",
    total: 199.99,
    status: "cancelled",
    date: "2024-09-24",
  },
  {
    id: "ORD005",
    customer: "Charlie Wilson",
    email: "charlie@example.com",
    total: 449.75,
    status: "completed",
    date: "2024-09-23",
  },
];

type SortDirection = "asc" | "desc" | null;

interface DataTableProps<T> {
  title: string;
  data: T[];
  columns: {
    key: keyof T;
    label: string;
    sortable?: boolean;
    render?: (value: any, item: T) => React.ReactNode;
  }[];
  icon?: React.ComponentType<any>;
  searchKey?: keyof T;
  filterOptions?: {
    key: keyof T;
    options: { label: string; value: any }[];
  };
}

function DataTable<T extends Record<string, any>>({
  title,
  data,
  columns,
  icon: Icon,
  searchKey,
  filterOptions,
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

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {Icon && <Icon className="h-5 w-5" />}
            <CardTitle>{title}</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <DownloadIcon className="h-4 w-4 mr-2" />
              {t("actions.export")}
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-4">
          {searchKey && (
            <div className="relative flex-1 max-w-sm">
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
                  <FilterIcon className="h-4 w-4 mr-2" />
                  {t("actions.filter")}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Filter by {filterOptions.key as string}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setFilterValue(null)}>All</DropdownMenuItem>
                {filterOptions.options.map((option) => (
                  <DropdownMenuItem key={option.value} onClick={() => setFilterValue(option.value)}>
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead
                    key={String(column.key)}
                    className={column.sortable ? "cursor-pointer select-none" : ""}
                    onClick={column.sortable ? () => handleSort(column.key) : undefined}
                  >
                    <div className="flex items-center gap-2">
                      {column.label}
                      {column.sortable && getSortIcon(column.key)}
                    </div>
                  </TableHead>
                ))}
                <TableHead>{t("table.headers.actions")}</TableHead>
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

interface DataListsProps {
  isLoading?: boolean;
}

export function DataLists({ isLoading = false }: DataListsProps) {
  const t = useTranslations("dashboard");

  // Translated sample data
  const sampleUsersTranslated: User[] = [
    {
      id: "1",
      name: t("sampleData.users.user1.name"),
      email: "ahmad@example.com",
      status: "active",
      role: t("sampleData.users.user1.role"),
      createdAt: "2024-01-15",
      lastLogin: "2024-09-27",
    },
    {
      id: "2",
      name: t("sampleData.users.user2.name"),
      email: "fatima@example.com",
      status: "active",
      role: t("sampleData.users.user2.role"),
      createdAt: "2024-02-20",
      lastLogin: "2024-09-26",
    },
    {
      id: "3",
      name: t("sampleData.users.user3.name"),
      email: "hassan@example.com",
      status: "inactive",
      role: t("sampleData.users.user3.role"),
      createdAt: "2024-01-30",
      lastLogin: "2024-09-20",
    },
    {
      id: "4",
      name: t("sampleData.users.user4.name"),
      email: "aisha@example.com",
      status: "pending",
      role: t("sampleData.users.user4.role"),
      createdAt: "2024-03-10",
      lastLogin: t("sampleData.never"),
    },
    {
      id: "5",
      name: t("sampleData.users.user5.name"),
      email: "omar@example.com",
      status: "active",
      role: t("sampleData.users.user5.role"),
      createdAt: "2024-02-05",
      lastLogin: "2024-09-27",
    },
  ];

  const sampleProductsTranslated: Product[] = [
    {
      id: "1",
      name: t("sampleData.products.product1.name"),
      price: 299.99,
      quantity: 25,
      total: 7499.75,
      date: "2024-09-27",
      status: "completed",
    },
    {
      id: "2",
      name: t("sampleData.products.product2.name"),
      price: 24.99,
      quantity: 150,
      total: 3748.5,
      date: "2024-09-26",
      status: "processing",
    },
    {
      id: "3",
      name: t("sampleData.products.product3.name"),
      price: 79.99,
      quantity: 45,
      total: 3599.55,
      date: "2024-09-25",
      status: "completed",
    },
    {
      id: "4",
      name: t("sampleData.products.product4.name"),
      price: 12.99,
      quantity: 200,
      total: 2598.0,
      date: "2024-09-24",
      status: "cancelled",
    },
    {
      id: "5",
      name: t("sampleData.products.product5.name"),
      price: 49.99,
      quantity: 80,
      total: 3999.2,
      date: "2024-09-23",
      status: "processing",
    },
  ];

  const sampleOrdersTranslated: Order[] = [
    {
      id: "ORD001",
      customer: t("sampleData.users.user1.name"),
      email: "ahmad@example.com",
      total: 299.99,
      status: "completed",
      date: "2024-09-27",
    },
    {
      id: "ORD002",
      customer: t("sampleData.users.user2.name"),
      email: "fatima@example.com",
      total: 149.5,
      status: "processing",
      date: "2024-09-26",
    },
    {
      id: "ORD003",
      customer: t("sampleData.users.user3.name"),
      email: "hassan@example.com",
      total: 75.25,
      status: "pending",
      date: "2024-09-25",
    },
    {
      id: "ORD004",
      customer: t("sampleData.users.user4.name"),
      email: "aisha@example.com",
      total: 199.99,
      status: "cancelled",
      date: "2024-09-24",
    },
    {
      id: "ORD005",
      customer: t("sampleData.users.user5.name"),
      email: "omar@example.com",
      total: 449.75,
      status: "completed",
      date: "2024-09-23",
    },
  ];
  const tShared = useTranslations("shared");

  if (isLoading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <Card key={i} className="animate-pulse border-primary/20">
            <CardHeader>
              <div className="h-6 bg-primary/20 rounded w-32 animate-pulse"></div>
              {/* <div className="h-4 bg-primary/10 rounded w-48 mt-2 animate-pulse"></div> */}
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="h-10 bg-primary/10 rounded flex-1 animate-pulse"></div>
                  <div className="h-10 bg-primary/20 rounded w-24 animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div key={j} className="h-12 bg-primary/5 rounded animate-pulse" />
                  ))}
                </div>
                <div className="text-center py-4">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-sm text-muted-foreground">Loading data tables...</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const userColumns = [
    { key: "name" as keyof User, label: t("table.headers.name"), sortable: true },
    { key: "email" as keyof User, label: t("table.headers.email"), sortable: true },
    {
      key: "status" as keyof User,
      label: t("table.headers.status"),
      sortable: true,
      render: (status: string) => getStatusBadge(status),
    },
    { key: "role" as keyof User, label: t("table.headers.role"), sortable: true },
    {
      key: "createdAt" as keyof User,
      label: t("table.headers.createdAt"),
      sortable: true,
    },
    {
      key: "lastLogin" as keyof User,
      label: t("table.headers.lastLogin"),
      sortable: true,
    },
  ];

  const productColumns = [
    { key: "name" as keyof Product, label: t("table.headers.product"), sortable: true },
    {
      key: "price" as keyof Product,
      label: t("table.headers.price"),
      sortable: true,
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      key: "quantity" as keyof Product,
      label: t("table.headers.quantity"),
      sortable: true,
    },
    {
      key: "total" as keyof Product,
      label: t("table.headers.total"),
      sortable: true,
      render: (total: number) => `$${total.toFixed(2)}`,
    },
    { key: "date" as keyof Product, label: t("table.headers.date"), sortable: true },
    {
      key: "status" as keyof Product,
      label: t("table.headers.status"),
      sortable: true,
      render: (status: string) => getStatusBadge(status),
    },
  ];

  const orderColumns = [
    { key: "id" as keyof Order, label: "Order ID", sortable: true },
    { key: "customer" as keyof Order, label: "Customer", sortable: true },
    {
      key: "total" as keyof Order,
      label: t("table.headers.total"),
      sortable: true,
      render: (total: number) => `$${total.toFixed(2)}`,
    },
    {
      key: "status" as keyof Order,
      label: t("table.headers.status"),
      sortable: true,
      render: (status: string) => getStatusBadge(status),
    },
    { key: "date" as keyof Order, label: t("table.headers.date"), sortable: true },
  ];

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

  return (
    <div className="space-y-8">
      <DataTable
        title={t("sections.userManagement")}
        data={sampleUsersTranslated}
        columns={userColumns}
        icon={UsersIcon}
        searchKey="name"
        filterOptions={{
          key: "status",
          options: [
            { label: t("status.active"), value: "active" },
            { label: t("status.inactive"), value: "inactive" },
            { label: t("status.pending"), value: "pending" },
          ],
        }}
      />

      <DataTable
        title={t("sections.topProducts")}
        data={sampleProductsTranslated}
        columns={productColumns}
        icon={BagIcon}
        searchKey="name"
        filterOptions={{
          key: "status",
          options: [
            { label: t("status.completed"), value: "completed" },
            { label: t("status.processing"), value: "processing" },
            { label: t("status.cancelled"), value: "cancelled" },
          ],
        }}
      />

      <DataTable
        title={t("sections.recentOrders")}
        data={sampleOrdersTranslated}
        columns={orderColumns}
        icon={UserCheckIcon}
        searchKey="customer"
        filterOptions={{
          key: "status",
          options: [
            { label: t("status.completed"), value: "completed" },
            { label: t("status.processing"), value: "processing" },
            { label: t("status.pending"), value: "pending" },
            { label: t("status.cancelled"), value: "cancelled" },
          ],
        }}
      />
    </div>
  );
}
