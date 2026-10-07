import { create, type StateCreator } from "zustand"

interface CartItemType {
  productId: number
  name: string
  quantity: number
  unitPrice: number
}

interface CartSlice {
  cart: CartItemType[]
  totalValueCart: number
  setCart: (cart: CartItemType[]) => void
}

interface DeliverySlice {
  daysOfDelivery: number
  setDaysOfDelivery: (days: number) => void
}

const createCartSlice: StateCreator<CartSlice, [], [], CartSlice> = (set) => ({
  cart: [],
  totalValueCart: 0,
  daysOfDelivery: 1,
  setCart: (cart: CartItemType[]) =>
    set(() => ({
      cart,
      totalValueCart: cart.reduce((acc, item) => {
        acc += item.unitPrice * item.quantity
        return acc
      }, 0),
    })),
})

const createDeliverySlice: StateCreator<DeliverySlice, [], [], DeliverySlice> = (set) => ({
  daysOfDelivery: 1,
  setDaysOfDelivery: (days: number) =>
    set(() => ({
      daysOfDelivery: days,
    })),
})

export const useBoundStore = create<CartSlice & DeliverySlice>()((...a) => ({
  ...createCartSlice(...a),
  ...createDeliverySlice(...a),
}))
