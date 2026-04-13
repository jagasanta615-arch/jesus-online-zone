import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createActor } from "../backend";
import type { Order } from "../types";

export function useOrders() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getOrders();
      return result as Order[];
    },
    enabled: !!actor && !isFetching,
  });
}

export interface AddOrderPayload {
  serviceName: string;
  customerName: string;
  phone: string;
  email: string;
  fileUrls: string[];
}

export function useAddOrder() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<bigint, Error, AddOrderPayload>({
    mutationFn: async ({
      serviceName,
      customerName,
      phone,
      email,
      fileUrls,
    }) => {
      if (!actor) throw new Error("Backend not available");
      return actor.addOrder(serviceName, customerName, phone, email, fileUrls);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}

export function useUpdateOrderStatus() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, { id: bigint; status: string }>({
    mutationFn: async ({ id, status }) => {
      if (!actor) throw new Error("Backend not available");
      return actor.updateOrderStatus(id, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
