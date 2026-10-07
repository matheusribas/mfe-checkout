import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { formDeliverySchema } from "@/components/features/Delivery/schema"
import { Delivery } from "@/components/features/Delivery"
import { Payment } from "@/components/features/Payment"
import { formPaymentSchema } from "@/components/features/Payment/schema"
import { Confirmation } from "@/components/features/Confirmation"
import { useBoundStore } from "@/stores"
import { DialogConfirmOrder } from "@/components/features/DialogConfirmOrder"
import { toast } from "@/components/ui/toast"
import type { CheckoutFormType } from "@/components/shared/types"
import { formatOrder } from "@/utils/format"
import { useMutationCreateOrder } from "@/api/hooks/checkout/useMutationCreateOrder"

type TabType = "delivery" | "payment" | "confirmation"

export const defaultValues: CheckoutFormType = {
  method: "delivery",
  cep: "",
  adress: "",
  number: "",
  complement: "",
  uf: "",
  city: "",
  delivery: "sedex",

  paymentType: "credit-card",
  cardNumber: "",
  cardholderName: "",
  cardExpirationDate: "",
  cardSecurityCode: "",
  cardholderIdentification: "",
  cardholderIdentificationType: "cpf",
  installments: null,
}

export function Wrapper() {
  const cart = useBoundStore((state) => state.cart)
  const openModal = useBoundStore((state) => state.openModal)
  const [tab, setTab] = useState<TabType>("delivery")
  const [tabsEnabled, setTabsEnabled] = useState<TabType[]>(["delivery"])
  const mutateOrder = useMutationCreateOrder()

  const form = useForm<CheckoutFormType>({
    resolver: zodResolver(formDeliverySchema.and(formPaymentSchema)),
    defaultValues,
  })

  const changeTab = (newTab: TabType) => {
    setTab(newTab)
    setTabsEnabled((prev) => {
      if (prev.find((tab) => tab === newTab)?.length) return prev
      else return [...prev, newTab]
    })
  }

  const handleValidDeliveryForm = async () => {
    const isDeliveryValid = await form.trigger(
      ["method", "cep", "adress", "number", "uf", "city", "delivery"],
      { shouldFocus: true }
    )

    if (!isDeliveryValid) return
    changeTab("payment")
  }

  const handleValidPaymentForm = async () => {
    const isPaymentValid = await form.trigger(
      [
        "paymentType",
        "cardNumber",
        "cardholderName",
        "cardExpirationDate",
        "cardSecurityCode",
        "cardholderIdentification",
        "cardholderIdentificationType",
        "installments",
      ],
      { shouldFocus: true }
    )

    if (!isPaymentValid) return
    changeTab("confirmation")
  }

  const handleChangeTab = (newTab: TabType) => {
    switch (newTab) {
      case "delivery":
        changeTab("delivery")
        break
      case "payment":
        void handleValidDeliveryForm()
        break
      case "confirmation":
        void handleValidPaymentForm()
        break

      default:
        break
    }
  }

  const handleSave = async () => {
    const isFormValid = await form.trigger()

    if (!isFormValid) {
      toast.add({
        type: "error",
        priority: "high",
        title: "Erro em algum campo obrgatório",
        description: "Verifique se algum campo está incorreto",
      })
      return
    }

    const order = form.getValues()
    const orderFormat = formatOrder({ ...order, items: cart })

    mutateOrder.mutate(orderFormat)
    openModal("confirm-order")
  }

  return (
    <div className="flex h-full min-w-0 flex-col">
      <FormProvider {...form}>
        <Tabs value={tab} onValueChange={handleChangeTab} className="gap-6">
          <TabsList variant="line" className="w-full">
            <TabsTrigger value="delivery">Entrega</TabsTrigger>
            <TabsTrigger
              value="payment"
              disabled={!tabsEnabled.includes("payment")}
            >
              Pagamento
            </TabsTrigger>
            <TabsTrigger
              value="confirmation"
              disabled={!tabsEnabled.includes("confirmation")}
            >
              Confirmação
            </TabsTrigger>
          </TabsList>
          <TabsContent value="delivery">
            <Delivery onValidForm={handleValidDeliveryForm} />
          </TabsContent>
          <TabsContent value="payment">
            <Payment onValidForm={handleValidPaymentForm} />
          </TabsContent>
          <TabsContent value="confirmation">
            <Confirmation onSave={handleSave} />
          </TabsContent>
        </Tabs>
        <DialogConfirmOrder
          data={mutateOrder.data}
          isSuccess={mutateOrder.isSuccess}
          isError={mutateOrder.isError}
        />
      </FormProvider>
    </div>
  )
}
