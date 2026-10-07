import { CircleXIcon } from "lucide-react"

export function ErrorFeedback() {
  return (
    <>
      <span />
      <CircleXIcon className="size-8 text-destructive" />
      <p>Erro ao fazer pagamento.</p>
    </>
  )
}
