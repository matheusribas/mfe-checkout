export const sanitizedCep = (cep: string) => {
  const sanitizedCep = cep.replace(/\D/g, "")
  if (sanitizedCep.length !== 8) {
    throw new Error("CEP inválido. Deve conter exatamente 8 dígitos.")
  }
  return sanitizedCep
}
