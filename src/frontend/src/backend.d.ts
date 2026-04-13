import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Order {
    id: bigint;
    customerName: string;
    status: string;
    serviceName: string;
    fileUrls: Array<string>;
    email: string;
    timestamp: bigint;
    phone: string;
}
export interface backendInterface {
    addOrder(serviceName: string, customerName: string, phone: string, email: string, fileUrls: Array<string>): Promise<bigint>;
    getOrders(): Promise<Array<Order>>;
    updateOrderStatus(id: bigint, status: string): Promise<boolean>;
}
