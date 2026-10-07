import { createOrder } from "@/api/fetchs/checkout/createOrder"
import type { OrderType } from "@/components/shared/types"
import { useMutation } from "@tanstack/react-query"

export function useMutationCreateOrder() {
  return useMutation({
    mutationKey: ["create-order"],
    mutationFn: (order: OrderType) => createOrder(order),
  })
}
