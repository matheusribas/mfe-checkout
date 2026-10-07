export function formatDocument(
  value: string | undefined,
  type: "cpf" | "cnpj"
) {
  const normalized = (value ?? "").toUpperCase().replace(/[^A-Z0-9]/g, "")

  if (type === "cpf") {
    const digits = normalized.slice(0, 11)
    if (digits.length > 9) {
      return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6, 9)}-${digits.slice(9)}`
    }
    if (digits.length > 6) {
      return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(6)}`
    }
    if (digits.length > 3) {
      return `${digits.slice(0, 3)}.${digits.slice(3)}`
    }
    return digits
  }

  const base = normalized.slice(0, 12)
  const checkDigits = normalized.slice(12).replace(/\D/g, "").slice(0, 2)
  const valueToFormat = `${base}${checkDigits}`

  if (valueToFormat.length > 12) {
    return `${valueToFormat.slice(0, 2)}.${valueToFormat.slice(2, 5)}.${valueToFormat.slice(5, 8)}/${valueToFormat.slice(8, 12)}-${valueToFormat.slice(12)}`
  }
  if (valueToFormat.length > 8) {
    return `${valueToFormat.slice(0, 2)}.${valueToFormat.slice(2, 5)}.${valueToFormat.slice(5, 8)}/${valueToFormat.slice(8)}`
  }
  if (valueToFormat.length > 5) {
    return `${valueToFormat.slice(0, 2)}.${valueToFormat.slice(2, 5)}.${valueToFormat.slice(5)}`
  }
  if (valueToFormat.length > 2) {
    return `${valueToFormat.slice(0, 2)}.${valueToFormat.slice(2)}`
  }
  return valueToFormat
}

export function formatCurrency(
  value: number,
  locale: string,
  currency: string
) {
  return value.toLocaleString(locale, { style: "currency", currency })
}
