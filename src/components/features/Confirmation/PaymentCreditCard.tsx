import type { CheckoutFormType } from "@/components/shared/types"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDocument } from "@/utils/format"
import { CreditCardIcon } from "lucide-react"
import { useFormContext } from "react-hook-form"

export function PaymentCreditCard() {
  const { watch } = useFormContext<CheckoutFormType>()
  const [
    cardNumber,
    cardExpirationDate,
    cardSecurityCode,
    cardholderName,
    cardholderIdentification,
    cardholderIdentificationType,
  ] = watch([
    "cardNumber",
    "cardExpirationDate",
    "cardSecurityCode",
    "cardholderName",
    "cardholderIdentification",
    "cardholderIdentificationType",
  ])

  return (
    <Item variant="muted">
      <ItemMedia variant="icon">
        <CreditCardIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Pagamento com Cartão de Crédito</ItemTitle>
        <div className="mt-2 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-3 w-7.5 animate-none" />
            <Skeleton className="h-3 w-7.5 animate-none" />
            <Skeleton className="h-3 w-7.5 animate-none" />
            <span className="text-muted-foreground">
              {cardNumber?.slice(-4)}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground">{cardholderName}</span>-
            <span className="text-muted-foreground">
              {String(cardExpirationDate).slice(0, 2)}/
              {String(cardExpirationDate).slice(-2)}
            </span>
            -<span className="text-muted-foreground">{cardSecurityCode}</span>
          </div>
        </div>
        <ItemDescription>
          <span className="uppercase">{cardholderIdentificationType}</span>:{" "}
          {formatDocument(
            cardholderIdentification,
            cardholderIdentificationType
          )}
        </ItemDescription>
      </ItemContent>
    </Item>
  )
}
