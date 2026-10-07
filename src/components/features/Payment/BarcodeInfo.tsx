import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { ScanBarcodeIcon } from "lucide-react"

export function BarcodeInfo() {
  return (
    <div className="flex min-h-25 items-center justify-center">
      <Item variant="muted">
        <ItemMedia variant="icon">
          <ScanBarcodeIcon />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Pagamento por Boleto</ItemTitle>
          <ItemDescription>
            Finalize o pedido para receber o <b>boleto</b> e concluir a compra
          </ItemDescription>
        </ItemContent>
      </Item>
    </div>
  )
}
