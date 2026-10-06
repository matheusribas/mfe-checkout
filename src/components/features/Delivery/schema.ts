import * as z from "zod"

export const formDeliverySchema = z
  .object({
    method: z.enum(["delivery", "pickup"]),
    cep: z.string().optional(),
    adress: z.string().optional(),
    number: z.string().optional(),
    complement: z.string().max(100).optional(),
    uf: z.string().optional(),
    city: z.string().optional(),
    delivery: z.enum(["sedex"]),
  })
  .superRefine((data, context) => {
    if (data.method !== "delivery") return

    const isCepInvalid = !data.cep || !/^\d{5}-\d{3}$/.test(data.cep)
    if (isCepInvalid) {
      context.addIssue({
        code: "custom",
        path: ["cep"],
        message: "Campo obrigatório",
      })
    }
    if (!data.adress && !isCepInvalid) {
      context.addIssue({
        code: "custom",
        path: ["adress"],
        message: "Campo obrigatório",
      })
    }
    if (!data.number && !isCepInvalid) {
      context.addIssue({
        code: "custom",
        path: ["number"],
        message: "Campo obrigatório",
      })
    }
    if ((!data.uf || data.uf.length !== 2) && !isCepInvalid) {
      context.addIssue({
        code: "custom",
        path: ["uf"],
        message: "Campo obrigatório",
      })
    }
    if ((!data.city || data.city.length < 2) && !isCepInvalid) {
      context.addIssue({
        code: "custom",
        path: ["city"],
        message: "Campo obrigatório",
      })
    }
  })
export type DeliveryFormData = z.infer<typeof formDeliverySchema>
