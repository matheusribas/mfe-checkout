import { useState } from "react"
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

type TabType = "delivery" | "payment" | "confirmation"

type FormData = DeliveryFormData & PaymentFormData

const defaultValues: FormData = {
  method: "delivery",
  cep: "",
  adress: "",
  number: "",
  complement: "",
  uf: "",
  city: "",
  delivery: "sedex",

  type: "credit-card",
  cardNumber: "",
  cardholderName: "",
  expirationDate: "",
  securityCode: "",
  cardholderIdentification: "",
  cardholderIdentificationType: "cpf",
  installments: null,
}

export function App() {
  const [tab, setTab] = useState<TabType>("confirmation")
  const [tabsEnabled, setTabsEnabled] = useState<TabType[]>(['confirmation'])

  const form = useForm<FormData>({
    resolver: zodResolver(formDeliverySchema.and(formPaymentSchema)),
    defaultValues
  })

  const changeTab = (newTab: TabType) => {
    setTab(newTab)
    setTabsEnabled(prev => [...prev, newTab])
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
        "type",
        "cardNumber",
        "cardholderName",
        "expirationDate",
        "securityCode",
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
    if (newTab === "payment") {
      void handleValidDeliveryForm()
      return
    }
    if (newTab === "confirmation") {
      void handleValidPaymentForm()
      return
    }
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
            <TabsTrigger value="confirmation"
              disabled={!tabsEnabled.includes("confirmation")}>
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
            Confirmation
          </TabsContent>
        </Tabs>
      </FormProvider>
    </div>
  )
}

export default App
