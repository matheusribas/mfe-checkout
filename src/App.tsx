import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  formDeliverySchema,
  type DeliveryFormData,
} from "@/components/features/Delivery/schema"
import { Delivery } from "@/components/features/Delivery"
import { Payment } from "@/components/features/Payment"
import {
  formPaymentSchema,
  type PaymentFormData,
} from "./components/features/Payment/schema"
import { Confirmation } from "./components/features/Confirmation"
import { toast } from "./components/ui/toast"
import { useBoundStore } from "./stores"

type TabType = "delivery" | "payment" | "confirmation"

export type FormData = DeliveryFormData & PaymentFormData

const defaultValues: FormData = {
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

const cart = [
  {
    productId: 1,
    name: "Tênis Runner Pro",
    quantity: 1,
    unitPrice: 299.9,
  },
  {
    productId: 3,
    name: "Camiseta Essential",
    quantity: 2,
    unitPrice: 79.9,
  },
]

export function App() {
  const setCart = useBoundStore((state) => state.setCart)
  const [tab, setTab] = useState<TabType>("delivery")
  const [tabsEnabled, setTabsEnabled] = useState<TabType[]>(["delivery"])

  const form = useForm<FormData>({
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

  const handleSave = () => {
    toast.add({
      type: "success",
      priority: "high",
      title: "Pedido finalizado com sucesso",
      description: "Seu pedido foi finalizado com sucesso",
    })
  }

  useEffect(() => setCart(cart), [setCart])

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
      </FormProvider>
    </div>
  )
}

export default App
