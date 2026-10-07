import type { CheckoutFormType } from "@/App"
import { useFormContext } from "react-hook-form"

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { MapPinIcon } from "lucide-react"
import { useBoundStore } from "@/stores"

export function AdressDelivery() {
  const { watch } = useFormContext<CheckoutFormType>()
  const [adress, number, complement, city, uf] = watch([
    "adress",
    "number",
    "complement",
    "city",
    "uf",
  ])
  const daysOfDelivery = useBoundStore((state) => state.daysOfDelivery)

  return (
    <Item variant="muted">
      <ItemMedia variant="icon">
        <MapPinIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>
          {adress}, {number} - {complement}, {city} - {uf}
        </ItemTitle>
        <ItemDescription>
          Entregue em {daysOfDelivery}{" "}
          {daysOfDelivery === 1 ? "dia útil" : "dias úteis"}
        </ItemDescription>
      </ItemContent>
    </Item>
  )
}
