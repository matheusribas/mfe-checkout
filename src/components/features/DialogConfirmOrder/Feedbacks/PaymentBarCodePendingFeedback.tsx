import { Button } from "@/components/ui/button"
import { Item } from "@/components/ui/item"
import { Spinner } from "@/components/ui/spinner"
import Barcode from "react-barcode"

interface PaymentBarCodePendingFeedbackProps {
  onConfirmPayment: () => void
  isLoading: boolean
}

export function PaymentBarCodePendingFeedback({
  onConfirmPayment,
  isLoading,
}: PaymentBarCodePendingFeedbackProps) {
  return (
    <>
      <Item
        variant="muted"
        className="w-full max-w-full min-w-0 items-center justify-center overflow-hidden"
      >
        <Barcode
          value="https://www.linkedin.com/in/matheusribas/"
          format="CODE128"
          width={0.75}
          height={60}
          displayValue={false}
          className="block h-auto max-w-full"
        />
      </Item>
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-center">
          Leia o código de barras para fazer o pagamento via boleto.
        </p>
        <Button onClick={onConfirmPayment} disabled={isLoading}>
          {isLoading && <Spinner />}
          Confirmar pagamento
        </Button>
      </div>
    </>
  )
}
