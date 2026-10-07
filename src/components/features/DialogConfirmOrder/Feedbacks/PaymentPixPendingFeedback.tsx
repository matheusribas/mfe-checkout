import { Button } from "@/components/ui/button"
import { Item } from "@/components/ui/item"
import { Spinner } from "@/components/ui/spinner"
import { QRCodeSVG } from "qrcode.react"

interface PaymentPixPendingFeedbackProps {
  onConfirmPayment: () => void
  isLoading: boolean
}

export function PaymentPixPendingFeedback({
  onConfirmPayment,
  isLoading,
}: PaymentPixPendingFeedbackProps) {
  return (
    <>
      <Item variant="muted" className="w-fit items-center justify-center">
        <QRCodeSVG
          value="00020101021126580014br.gov.bcb.pix01367dcf5e6c-8817-4633-886b-7b0cdb1274155204000053039865802BR5920MATHEUS FELIPE RIBAS6009SAO PAULO62070503***6304D5E6"
          size={200}
        />
      </Item>
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-center">
          Leia o QR Code para fazer o pagamento via pix.
        </p>
        <Button onClick={onConfirmPayment} disabled={isLoading}>
          {isLoading && <Spinner />}
          Confirmar pagamento
        </Button>
      </div>
    </>
  )
}
