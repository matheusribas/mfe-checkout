import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
  type ItemProps,
} from "@/components/ui/item"
import { ScanBarcodeIcon } from "lucide-react"

type PaymentBarCodeProps = ItemProps

export function PaymentBarCodeItem(props: PaymentBarCodeProps) {
  return (
    <Item variant="muted" {...props}>
      <ItemMedia variant="icon">
        <ScanBarcodeIcon />
      </ItemMedia>
      <ItemContent>
        <ItemTitle>Pagamento por Boleto</ItemTitle>
        <ItemDescription>
          Finalize o pedido para receber o boleto e concluir a compra
        </ItemDescription>
      </ItemContent>
    </Item>
  )
}
