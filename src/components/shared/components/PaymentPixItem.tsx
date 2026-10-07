import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  type ItemProps,
} from "@/components/ui/item"
import { QrCodeIcon } from "lucide-react"

type PaymentPixItemProps = ItemProps

export function PaymentPixItem(props: PaymentPixItemProps) {
  return (
    <Item variant="muted" {...props}>
      <ItemMedia variant="icon">
        <QrCodeIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Pagamento por Pix</ItemTitle>
        <ItemDescription>
          Finalize o pedido para receber o QR Code do pix e concluir a compra
        </ItemDescription>
      </ItemContent>
    </Item>
  )
}
