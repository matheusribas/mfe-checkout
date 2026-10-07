import { useCallback, useEffect, useMemo } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ErrorFeedback } from "@/components/features/DialogConfirmOrder/Feedbacks/ErrorFeedback"
import { LoadingFeedback } from "@/components/features/DialogConfirmOrder/Feedbacks/LoadingFeedback"
import { SuccessFeedback } from "@/components/features/DialogConfirmOrder/Feedbacks/SuccessFeedback"
import { PaymentPixPendingFeedback } from "@/components/features/DialogConfirmOrder/Feedbacks/PaymentPixPendingFeedback"
import { PaymentBarCodePendingFeedback } from "@/components/features/DialogConfirmOrder/Feedbacks/PaymentBarCodePendingFeedback"
import { useBoundStore } from "@/stores"
import type { OrderCreateType } from "@/components/shared/types"
import { useMutationPatchOrder } from "@/api/hooks/checkout/useMutationPatchOrder"
import confetti from "canvas-confetti"

interface DialogConfirmOrderProps {
  data?: OrderCreateType
  isSuccess: boolean
  isError: boolean
}
export function DialogConfirmOrder({
  data,
  isSuccess,
  isError,
}: DialogConfirmOrderProps) {
  const mutatePatchOrder = useMutationPatchOrder()
  const modalIsOpen = useBoundStore((state) => state.modalIsOpen)
  const modal = useBoundStore((state) => state.modal)
  const closeModal = useBoundStore((state) => state.closeModal)

  const isOpen = modalIsOpen && modal === "confirm-order"
  const patchedOrder =
    data?.id && mutatePatchOrder.data?.id === data.id
      ? mutatePatchOrder.data
      : undefined
  const statusOrder = patchedOrder?.status ?? data?.status ?? "pending"

  const handleOpenChange = (open: boolean) => {
    if (!open) closeModal("confirm-order")
  }

  const handleConfirmPayment = useCallback(async () => {
    await mutatePatchOrder.mutateAsync({
      id: data?.id,
      status: "paid",
    })
  }, [mutatePatchOrder, data?.id])

  const renderFeedback = useMemo(() => {
    if (!isError && !isSuccess) {
      return <LoadingFeedback />
    } else if (isError) {
      return <ErrorFeedback />
    } else if (isSuccess && statusOrder === "paid") {
      return <SuccessFeedback />
    } else if (
      isSuccess &&
      statusOrder === "pending" &&
      data?.payment?.paymentType === "pix"
    ) {
      return (
        <PaymentPixPendingFeedback
          isLoading={mutatePatchOrder.isPending}
          onConfirmPayment={handleConfirmPayment}
        />
      )
    } else if (
      isSuccess &&
      statusOrder === "pending" &&
      data?.payment?.paymentType === "bar-code"
    ) {
      return (
        <PaymentBarCodePendingFeedback
          isLoading={mutatePatchOrder.isPending}
          onConfirmPayment={handleConfirmPayment}
        />
      )
    }
  }, [
    statusOrder,
    data?.payment.paymentType,
    isError,
    isSuccess,
    handleConfirmPayment,
    mutatePatchOrder.isPending,
  ])

  useEffect(() => {
    if (isSuccess && statusOrder === "paid") {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }, [isSuccess, statusOrder])

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="flex min-h-100 flex-1 flex-col items-center justify-center gap-6 sm:max-w-sm"
      >
        {renderFeedback}
      </DialogContent>
    </Dialog>
  )
}
