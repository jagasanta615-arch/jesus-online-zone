import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  ClipboardList,
} from "lucide-react";
import { useState } from "react";
import { useOrders, useUpdateOrderStatus } from "../hooks/useOrders";
import type { Order, OrderStatus } from "../types";

type SortKey =
  | "serviceName"
  | "customerName"
  | "phone"
  | "email"
  | "timestamp"
  | "status";
type SortDir = "asc" | "desc";

const STATUS_OPTIONS: OrderStatus[] = [
  "pending",
  "processing",
  "completed",
  "cancelled",
];

function statusClasses(status: string): string {
  switch (status) {
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "completed":
      return "bg-green-100 text-green-800 border-green-200";
    case "processing":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "cancelled":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
}

function statusDot(status: string): string {
  switch (status) {
    case "pending":
      return "bg-yellow-400";
    case "completed":
      return "bg-green-500";
    case "processing":
      return "bg-blue-500";
    case "cancelled":
      return "bg-red-400";
    default:
      return "bg-muted-foreground";
  }
}

function formatTimestamp(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  const date = new Date(ms);
  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
}

function SortIcon({
  col,
  sortKey,
  sortDir,
}: { col: SortKey; sortKey: SortKey; sortDir: SortDir }) {
  if (col !== sortKey)
    return <ArrowUpDown className="h-3.5 w-3.5 opacity-40 ml-1 inline-block" />;
  return sortDir === "asc" ? (
    <ChevronUp className="h-3.5 w-3.5 ml-1 inline-block text-primary" />
  ) : (
    <ChevronDown className="h-3.5 w-3.5 ml-1 inline-block text-primary" />
  );
}

function LoadingSkeleton() {
  return (
    <div className="space-y-3" data-ocid="admin-loading">
      <Skeleton className="h-12 w-full rounded-lg" />
      {[1, 2, 3, 4, 5].map((i) => (
        <Skeleton key={i} className="h-14 w-full rounded-lg" />
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div
      className="flex flex-col items-center justify-center py-24 text-center bg-card rounded-xl border border-border"
      data-ocid="admin-empty"
    >
      <ClipboardList className="h-14 w-14 text-muted-foreground mb-4 opacity-40" />
      <h3 className="text-lg font-semibold text-foreground mb-1">
        No orders yet
      </h3>
      <p className="text-muted-foreground text-sm max-w-xs">
        Orders placed through the service portal will appear here once customers
        submit requests.
      </p>
    </div>
  );
}

interface StatusCellProps {
  order: Order;
  onUpdate: (id: bigint, status: string) => void;
  isPending: boolean;
}

function StatusCell({ order, onUpdate, isPending }: StatusCellProps) {
  return (
    <Select
      value={order.status}
      onValueChange={(val) => onUpdate(order.id, val)}
      disabled={isPending}
    >
      <SelectTrigger
        className={`h-7 min-w-[128px] text-xs font-semibold border rounded-full px-3 ${statusClasses(order.status)}`}
        data-ocid={`status-select-${order.id}`}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {STATUS_OPTIONS.map((s) => (
          <SelectItem key={s} value={s} className="text-xs capitalize">
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default function Admin() {
  const { data: orders, isLoading } = useOrders();
  const updateStatus = useUpdateOrderStatus();

  const [sortKey, setSortKey] = useState<SortKey>("timestamp");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  function handleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function handleUpdateStatus(id: bigint, status: string) {
    updateStatus.mutate({ id, status });
  }

  const sorted = [...(orders ?? [])].sort((a, b) => {
    let valA: string | bigint = "";
    let valB: string | bigint = "";

    if (sortKey === "serviceName") {
      valA = a.serviceName;
      valB = b.serviceName;
    } else if (sortKey === "customerName") {
      valA = a.customerName;
      valB = b.customerName;
    } else if (sortKey === "phone") {
      valA = a.phone;
      valB = b.phone;
    } else if (sortKey === "email") {
      valA = a.email;
      valB = b.email;
    } else if (sortKey === "timestamp") {
      valA = a.timestamp;
      valB = b.timestamp;
    } else if (sortKey === "status") {
      valA = a.status;
      valB = b.status;
    }

    if (valA < valB) return sortDir === "asc" ? -1 : 1;
    if (valA > valB) return sortDir === "asc" ? 1 : -1;
    return 0;
  });

  const columns: { key: SortKey; label: string }[] = [
    { key: "serviceName", label: "Service" },
    { key: "customerName", label: "Customer" },
    { key: "phone", label: "Phone" },
    { key: "email", label: "Email" },
    { key: "timestamp", label: "Date / Time" },
    { key: "status", label: "Status" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-5 flex items-center justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-primary leading-tight">
              Admin Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              Manage and track all service orders
            </p>
          </div>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            data-ocid="admin-back-home"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Stats bar */}
      {!isLoading && orders && orders.length > 0 && (
        <div className="bg-muted/40 border-b border-border">
          <div className="container mx-auto px-4 py-3 flex flex-wrap gap-x-6 gap-y-2 text-sm items-center">
            {(
              [
                "pending",
                "processing",
                "completed",
                "cancelled",
              ] as OrderStatus[]
            ).map((s) => {
              const count = orders.filter((o) => o.status === s).length;
              return (
                <span key={s} className="flex items-center gap-1.5">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${statusDot(s)}`}
                  />
                  <span className="capitalize text-muted-foreground">{s}:</span>
                  <span className="font-semibold text-foreground">{count}</span>
                </span>
              );
            })}
            <span className="flex items-center gap-1.5 sm:ml-auto">
              <span className="text-muted-foreground">Total orders:</span>
              <span className="font-bold text-foreground">{orders.length}</span>
            </span>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {isLoading ? (
          <LoadingSkeleton />
        ) : !orders || orders.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="bg-card rounded-xl border border-border elevation-sm overflow-hidden">
            <div className="overflow-x-auto scrollbar-thin">
              <table
                className="w-full text-sm min-w-[720px]"
                data-ocid="orders-table"
              >
                <thead>
                  <tr className="bg-muted/50 border-b border-border">
                    {columns.map(({ key, label }) => (
                      <th
                        key={key}
                        scope="col"
                        aria-sort={
                          sortKey === key
                            ? sortDir === "asc"
                              ? "ascending"
                              : "descending"
                            : "none"
                        }
                        className="px-4 py-3 text-left font-semibold text-foreground whitespace-nowrap cursor-pointer select-none hover:bg-muted/80 transition-colors"
                        onClick={() => handleSort(key)}
                        onKeyDown={(e) =>
                          (e.key === "Enter" || e.key === " ") &&
                          handleSort(key)
                        }
                        data-ocid={`sort-${key}`}
                      >
                        {label}
                        <SortIcon
                          col={key}
                          sortKey={sortKey}
                          sortDir={sortDir}
                        />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((order, idx) => (
                    <tr
                      key={String(order.id)}
                      className={`border-b border-border last:border-0 hover:bg-muted/20 transition-colors ${idx % 2 === 0 ? "" : "bg-muted/10"}`}
                      data-ocid={`order-row-${order.id}`}
                    >
                      <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap max-w-[180px] truncate">
                        {order.serviceName}
                      </td>
                      <td className="px-4 py-3 text-foreground whitespace-nowrap">
                        {order.customerName}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap font-mono text-xs">
                        {order.phone}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap max-w-[200px] truncate">
                        {order.email || (
                          <span className="italic opacity-50">—</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground whitespace-nowrap text-xs">
                        {formatTimestamp(order.timestamp)}
                      </td>
                      <td className="px-4 py-3">
                        <StatusCell
                          order={order}
                          onUpdate={handleUpdateStatus}
                          isPending={updateStatus.isPending}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
