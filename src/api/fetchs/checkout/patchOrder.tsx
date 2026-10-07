import type { OrderCreateType } from "@/components/shared/types"
import { API_CHECKOUT, delay } from "@/utils/apis"

export const patchOrder = async (
  data: Partial<OrderCreateType>
): Promise<OrderCreateType> => {
  await delay(1500)
  const response = await fetch(`${API_CHECKOUT}/orders/${data.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Não foi possível criar o pedido")
  }

  return response.json()
}
