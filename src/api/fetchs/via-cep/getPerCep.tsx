import { API_VIA_CEP } from "@/utils/apis"

interface CepResponseError {
  erro: "true"
}

interface CepResponse {
  cep: string
  logradouro: string
  bairro: string
  localidade: string
  uf: string
  estado: string
}

const formatUrl = (cep: string) => {
  return `${API_VIA_CEP}/${cep}/json/`
}

export const getPerCep = async (
  cep: string
): Promise<CepResponse | CepResponseError> => {
  const url = formatUrl(cep)
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return response.json()
}
