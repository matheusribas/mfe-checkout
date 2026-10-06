import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { MapPinIcon } from "lucide-react"

export function Pickup() {
  return (
    <div className="flex min-h-25 items-center justify-center">
      <Item variant="muted">
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
    </div>
  )
}
