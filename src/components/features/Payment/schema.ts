import { MAX_INSTALLMENTS } from "@/utils/constants"
import * as z from "zod"

export const formPaymentSchema = z
  .object({
    type: z.enum(["credit-card", "pix", "boleto"]),
    cardNumber: z.string().optional(),
    cardholderName: z.string().optional(),
    expirationDate: z.string().optional(),
    securityCode: z.string().optional(),
    cardholderIdentification: z.string().optional(),
    cardholderIdentificationType: z.enum(["cpf", "cnpj"]),
    installments: z.number().optional().nullable(),
  })
  .superRefine((data, context) => {
    const typeCreditCardSelected = data.type === "credit-card"

    if (typeCreditCardSelected) {
      if (!data.cardNumber) {
        context.addIssue({
          code: "custom",
          path: ["cardNumber"],
          message: "Campo obrigatório",
        })
      } else if (!/^\d{16}$/.test(data.cardNumber)) {
        context.addIssue({
          code: "custom",
          path: ["cardNumber"],
          message: "Número do cartão inválido",
        })
      }

      if (!data.cardholderName) {
        context.addIssue({
          code: "custom",
          path: ["cardholderName"],
          message: "Campo obrigatório",
        })
      }
      if (!data.expirationDate || !/^\d{4}$/.test(data.expirationDate)) {
        context.addIssue({
          code: "custom",
          path: ["expirationDate"],
          message: "Campo obrigatório",
        })
      } else {
        const [month, year] = [
          Number(data.expirationDate.slice(0, 2)),
          Number(data.expirationDate.slice(2, 4)),
        ]
        const currentDate = new Date()
        const [currentMonth, currentYear] = [
          currentDate.getMonth() + 1,
          Number(String(currentDate.getFullYear()).slice(-2)),
        ]

        if (
          year < currentYear ||
          (year === currentYear && month < currentMonth)
        ) {
          context.addIssue({
            code: "custom",
            path: ["expirationDate"],
            message: "Cartão vencido",
          })
        }
      }
      if (!data.securityCode || !/^\d{3}$/.test(data.securityCode)) {
        context.addIssue({
          code: "custom",
          path: ["securityCode"],
          message: "Campo obrigatório",
        })
      }

      if (!data.cardholderIdentification) {
        context.addIssue({
          code: "custom",
          path: ["cardholderIdentification"],
          message: "Campo obrigatório",
        })
      } else {
        const isCpf = data.cardholderIdentificationType === "cpf"
        const isValidIdentification = isCpf
          ? /^[A-Z0-9]{11}$/.test(data.cardholderIdentification)
          : /^[A-Z0-9]{12}\d{2}$/.test(data.cardholderIdentification)

        if (!isValidIdentification) {
          context.addIssue({
            code: "custom",
            path: ["cardholderIdentification"],
            message: isCpf
              ? "CPF deve conter 11 caracteres alfanuméricos"
              : "CNPJ deve conter 12 caracteres alfanuméricos e 2 dígitos verificadores",
          })
        }
      }

      if (
        !data.installments ||
        data.installments < 1 ||
        data.installments > MAX_INSTALLMENTS
      ) {
        context.addIssue({
          code: "custom",
          path: ["installments"],
          message: `Selecione um número de parcelas`,
        })
      }
    }
  })
export type PaymentFormData = z.infer<typeof formPaymentSchema>
