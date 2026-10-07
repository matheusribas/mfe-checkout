import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { QrCodeIcon } from "lucide-react"

export function PixInfo() {
  return (
    <div className="flex min-h-25 items-center justify-center">
      <Item variant="muted">
        <ItemMedia variant="icon">
          <QrCodeIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Pagamento por Pix</ItemTitle>
          <ItemDescription>
            Finalize o pedido para receber o QR Code do <b>Pix</b> e concluir a
            compra
          </ItemDescription>
        </ItemContent>
      </Item>
    </div>
  )
}
