import type { OrderCreateType, OrderType } from "@/components/shared/types"
import { API_CHECKOUT, delay } from "@/utils/apis"

export const createOrder = async (
  data: OrderType
): Promise<OrderCreateType> => {
  await delay(1500)
  const response = await fetch(`${API_CHECKOUT}/orders`, {
    method: "POST",
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
