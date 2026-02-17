"use client";
import { useTranslations } from "next-intl";
import { DataTable } from "./data-table";
import { User, Product, Order, TableColumn } from "../../types";
import { Badge } from "@/components/ui/badge";
import StatusBadge from "@/components/shared/StatusBadge";
import { UsersIcon, BagIcon, UserCheckIcon } from "@/lib/icons";
import Heading from "@/components/shared/heading";

interface DataSectionProps {
  data?: {
    users?: User[];
    products?: Product[];
    orders?: Order[];
  };
  isLoading?: boolean;
  table: string;
  description: string;
}

export function DataSection({ data, isLoading = false, table, description }: DataSectionProps) {
  const t = useTranslations("dashboard");
  const tShared = useTranslations("shared");

  // Default sample data with translations
  const defaultUsers: User[] = [
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

  const defaultProducts: Product[] = [
    {
      id: "1",
      name: t("sampleData.products.laptop.name"),
      price: 999.99,
      quantity: 10,
      total: 9999.9,
      date: "2024-09-27",
      status: "completed",
    },
    {
      id: "2",
      name: t("sampleData.products.smartphone.name"),
      price: 699.99,
      quantity: 25,
      total: 17499.75,
      date: "2024-09-26",
      status: "processing",
    },
    {
      id: "3",
      name: t("sampleData.products.headphones.name"),
      price: 149.99,
      quantity: 50,
      total: 7499.5,
      date: "2024-09-25",
      status: "completed",
    },
    {
      id: "4",
      name: t("sampleData.products.tablet.name"),
      price: 449.99,
      quantity: 15,
      total: 6749.85,
      date: "2024-09-24",
      status: "cancelled",
    },
    {
      id: "5",
      name: t("sampleData.products.smartwatch.name"),
      price: 199.99,
      quantity: 40,
      total: 7999.6,
      date: "2024-09-23",
      status: "processing",
    },
    {
      id: "6",
      name: t("sampleData.products.camera.name"),
      price: 799.99,
      quantity: 8,
      total: 6399.92,
      date: "2024-09-22",
      status: "completed",
    },
    {
      id: "7",
      name: t("sampleData.products.speaker.name"),
      price: 79.99,
      quantity: 100,
      total: 7999.0,
      date: "2024-09-21",
      status: "processing",
    },
    {
      id: "8",
      name: t("sampleData.products.keyboard.name"),
      price: 129.99,
      quantity: 35,
      total: 4549.65,
      date: "2024-09-20",
      status: "completed",
    },
    {
      id: "9",
      name: t("sampleData.products.monitor.name"),
      price: 299.99,
      quantity: 20,
      total: 5999.8,
      date: "2024-09-19",
      status: "cancelled",
    },
    {
      id: "10",
      name: t("sampleData.products.mouse.name"),
      price: 49.99,
      quantity: 75,
      total: 3749.25,
      date: "2024-09-18",
      status: "processing",
    },
  ];

  const defaultOrders: Order[] = [
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

  const userColumns: TableColumn<User>[] = [
    { key: "name", label: t("table.headers.name"), sortable: true },
    { key: "email", label: t("table.headers.email"), sortable: true },
    {
      key: "status",
      label: t("table.headers.status"),
      sortable: true,
      render: (status: string) => <StatusBadge status={status} />,
    },
    { key: "role", label: t("table.headers.role"), sortable: true },
    { key: "createdAt", label: t("table.headers.createdAt"), sortable: true },
    { key: "lastLogin", label: t("table.headers.lastLogin"), sortable: true },
  ];

  const productColumns: TableColumn<Product>[] = [
    { key: "name", label: t("table.headers.product"), sortable: true },
    {
      key: "price",
      label: t("table.headers.price"),
      sortable: true,
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    { key: "quantity", label: t("table.headers.quantity"), sortable: true },
    {
      key: "total",
      label: t("table.headers.total"),
      sortable: true,
      render: (total: number) => `$${total.toFixed(2)}`,
    },
    { key: "date", label: t("table.headers.date"), sortable: true },
    {
      key: "status",
      label: t("table.headers.status"),
      sortable: true,
      render: (status: string) => <StatusBadge status={status} />,
    },
  ];

  const orderColumns: TableColumn<Order>[] = [
    { key: "id", label: "Order ID", sortable: true },
    { key: "customer", label: "Customer", sortable: true },
    {
      key: "total",
      label: t("table.headers.total"),
      sortable: true,
      render: (total: number) => `$${total.toFixed(2)}`,
    },
    {
      key: "status",
      label: t("table.headers.status"),
      sortable: true,
      render: (status: string) => <StatusBadge status={status} />,
    },
    { key: "date", label: t("table.headers.date"), sortable: true },
  ];

  const users = data?.users || defaultUsers;
  const products = data?.products || defaultProducts;
  const orders = data?.orders || defaultOrders;

  return (
    <section className="space-y-6">
      {/* <Heading
        title={t("sections.dataLists")}
        description={t("sections.dataListsDescription")}
        className="mb-8"
      /> */}

      <div className="space-y-8">
        <DataTable
          title={table || "All plans"}
          description={description || "Unlock the potential of your candidates"}
          data={products}
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
          isLoading={isLoading}
        />
      </div>
    </section>
  );
}
