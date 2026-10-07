import { patchOrder } from "@/api/fetchs/checkout/patchOrder"
import type { OrderCreateType } from "@/components/shared/types"
import { useMutation } from "@tanstack/react-query"

export function useMutationPatchOrder() {
  return useMutation({
    mutationKey: ["patch-order"],
    mutationFn: (order: Partial<OrderCreateType>) => patchOrder(order),
  })
}
