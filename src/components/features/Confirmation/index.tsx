import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { useBoundStore } from "@/stores"
import { formatCurrency } from "@/utils/format"
import { CheckIcon, ShoppingBagIcon } from "lucide-react"
import { useFormContext } from "react-hook-form"
import { PickupItem } from "@/components/shared/components/PickupItem"
import { AdressDelivery } from "./AdressDelivery"
import { PaymentCreditCard } from "./PaymentCreditCard"
import { PaymentPixItem } from "@/components/shared/components/PaymentPixItem"
import { PaymentBarCodeItem } from "@/components/shared/components/PaymentBarCodeItem"
import { Separator } from "@/components/ui/separator"
import type { CheckoutFormType } from "@/components/shared/types"

interface ConfirmationProps {
  onSave: () => void
}

export function Confirmation({ onSave }: ConfirmationProps) {
  const { watch } = useFormContext<CheckoutFormType>()
  const [method, paymentType] = watch(["method", "paymentType"])
  const cart = useBoundStore((state) => state.cart)

  const renderPaymentPreview = () => {
    const paymentTypes = {
      "credit-card": <PaymentCreditCard />,
      pix: <PaymentPixItem />,
      "bar-code": <PaymentBarCodeItem />,
    }
    return paymentTypes[paymentType] !== undefined
      ? paymentTypes[paymentType]
      : null
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Confira seu pedido</CardTitle>
        <CardDescription>
          Verifique os detalhes do seu pedido antes de finalizar
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col gap-4">
          <h3 className="font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm">
            Produtos
          </h3>
          <ItemGroup className="gap-4">
            {cart.map((item) => (
              <Item key={item.productId} variant="muted">
                <ItemMedia variant="icon">
                  <ShoppingBagIcon />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{item.name}</ItemTitle>
                  <ItemDescription>Quantidade: {item.quantity}</ItemDescription>
                </ItemContent>
                <ItemContent className="flex-none text-center">
                  <ItemDescription className="font-semibold text-primary-foreground">
                    {formatCurrency(
                      item.unitPrice * item.quantity,
                      "pt-BR",
                      "BRL"
                    )}
                  </ItemDescription>
                </ItemContent>
              </Item>
            ))}
          </ItemGroup>
        </div>
        <Separator className="w-3xl" />
        <div className="flex flex-col gap-4">
          <h3 className="font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm">
            Endereço de {method === "delivery" ? "entrega" : "retirada"}
          </h3>
          {method === "delivery" ? <AdressDelivery /> : <PickupItem />}
        </div>
        <Separator className="w-3xl" />
        <div className="flex flex-col gap-4">
          <h3 className="font-heading text-base leading-snug font-medium group-data-[size=sm]/card:text-sm">
            Pagamento
          </h3>
          {renderPaymentPreview()}
        </div>
      </CardContent>
      <CardFooter className="w-full">
        <Button onClick={onSave} className="w-full">
          Finalizar pedido
          <CheckIcon />
        </Button>
      </CardFooter>
    </Card>
  )
}
