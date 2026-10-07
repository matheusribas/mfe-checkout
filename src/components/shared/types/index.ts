import type { DeliveryFormData } from "@/components/features/Delivery/schema"
import type { PaymentFormData } from "@/components/features/Payment/schema"

export type CheckoutFormType = DeliveryFormData & PaymentFormData

export interface CartItemType {
  productId: number
  name: string
  quantity: number
  unitPrice: number
}

export type StatusOrderType = "paid" | "pending" | "canceled"

export interface OrderType {
  status: StatusOrderType
  items: CartItemType[]
  shippingAddress: DeliveryFormData
  payment: PaymentFormData
  createdAt: string
}

export interface OrderCreateType extends OrderType {
  id: string
}
