import { Spinner } from "@/components/ui/spinner"

export function LoadingFeedback() {
  return (
    <>
      <span />
      <Spinner className="size-8" />
      <p className="shimmer shimmer-color-purple-500">
        Pedido sendo processado...
      </p>
    </>
  )
}
