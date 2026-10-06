import { getPerCep } from "@/api/fetchs/via-cep/getPerCep"
import { useMutation } from "@tanstack/react-query"

export function useMutationPerCep() {
  return useMutation({
    mutationKey: ["cep"],
    mutationFn: (cep: string) => getPerCep(cep),
  })
}
