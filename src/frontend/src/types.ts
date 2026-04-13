export interface Order {
  id: bigint;
  serviceName: string;
  customerName: string;
  phone: string;
  email: string;
  timestamp: bigint;
  status: string;
  fileUrls: string[];
}

export type OrderStatus = "pending" | "processing" | "completed" | "cancelled";

export type ServiceCategory =
  | "Government"
  | "Banking"
  | "Jobs"
  | "Printing"
  | "Design";

export interface Service {
  name: string;
  icon: string;
  category: ServiceCategory;
  color: "blue" | "green" | "orange" | "slate" | "purple";
  description: string;
}
