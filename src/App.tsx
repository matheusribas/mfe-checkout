import { Delivery } from "@/components/features/Delivery"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { FormProvider, useForm } from "react-hook-form"
import {
  formDeliverySchema,
  type DeliveryFormData,
} from "@/components/features/Delivery/schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"

type TabType = "delivery" | "payment"

export function App() {
  const [tab, setTab] = useState<TabType>("delivery")

  const form = useForm<DeliveryFormData>({
    resolver: zodResolver(formDeliverySchema),
    defaultValues: {
      method: "delivery",
      cep: "",
      adress: "",
      number: "",
      complement: "",
      uf: "",
      city: "",
      delivery: "sedex",
    },
  })

  const handleValidDeliveryForm = () => {
    // TODO: validar e passar para proxima tab

    setTab("payment")
  }

  const handleChangeTab = (newTab: TabType) => {
    if (newTab === "payment") {
      // TODO: validar deliveryForm antes de ir para proxima payment
    }
    setTab(newTab)
  }

  return (
    <div className="flex h-full min-w-0 flex-col">
      <FormProvider {...form}>
        <Tabs value={tab} onValueChange={handleChangeTab} className="gap-6">
          <TabsList variant="line" className="w-full">
            <TabsTrigger value="delivery">Entrega</TabsTrigger>
            <TabsTrigger
              value="payment"
              // disabled
              // TODO: desabilitar se deliveryForm não estiver validado
            >
              Pagamento
            </TabsTrigger>
          </TabsList>
          <TabsContent value="delivery">
            <Delivery onValidForm={handleValidDeliveryForm} />
          </TabsContent>
          <TabsContent value="payment">Pagamento</TabsContent>
        </Tabs>
      </FormProvider>
    </div>
  )
}

export default App
