import type { CartItemType } from "@/components/shared/types"
import { create, type StateCreator } from "zustand"

interface CartSlice {
  cart: CartItemType[]
  totalValueCart: number
  setCart: (cart: CartItemType[]) => void
}

interface DeliverySlice {
  daysOfDelivery: number
  setDaysOfDelivery: (days: number) => void
}

type ModalType = "confirm-order"

interface ModalStateType {
  modalIsOpen: boolean
  modal: ModalType | null
  openModal: (modal: ModalType) => void
  closeModal: (modal: ModalType) => void
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

const createDeliverySlice: StateCreator<
  DeliverySlice,
  [],
  [],
  DeliverySlice
> = (set) => ({
  daysOfDelivery: 1,
  setDaysOfDelivery: (days: number) =>
    set(() => ({
      daysOfDelivery: days,
    })),
})

const createModalSlice: StateCreator<ModalStateType, [], [], ModalStateType> = (
  set
) => ({
  modalIsOpen: false,
  modal: null,
  openModal: (modal: ModalType) => set(() => ({ modalIsOpen: true, modal })),
  closeModal: (modal: ModalType) => set(() => ({ modalIsOpen: false, modal })),
})

export const useBoundStore = create<
  CartSlice & DeliverySlice & ModalStateType
>()((...a) => ({
  ...createCartSlice(...a),
  ...createDeliverySlice(...a),
  ...createModalSlice(...a),
}))
