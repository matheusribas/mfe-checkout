import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  type ItemProps,
} from "@/components/ui/item"
import { MapPinIcon } from "lucide-react"

type PickupItemProps = ItemProps

export function PickupItem(props: PickupItemProps) {
  return (
    <Item variant="muted" {...props}>
      <ItemMedia variant="icon">
        <MapPinIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>
          Av. Cel. Silva Telles, 1002 - Cambuí, Campinas - SP
        </ItemTitle>
        <ItemDescription>Disponível em 2 dias úteis</ItemDescription>
      </ItemContent>
    </Item>
  )
}
