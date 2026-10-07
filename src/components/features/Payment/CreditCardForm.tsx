import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Controller, useFormContext, useWatch } from "react-hook-form"
import type { PaymentFormData } from "./schema"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDownIcon } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { formatCurrency, formatDocument } from "@/utils/format"
import { MAX_INSTALLMENTS } from "@/utils/constants"
import { useBoundStore } from "@/stores"

const items = Array.from({ length: MAX_INSTALLMENTS }, (_, index) => {
  const value = index + 1

  return {
    value,
    label(amount: number) {
      return `${value}x de ${formatCurrency(amount / value, "pt-BR", "BRL")}`
    },
  }
})

export function CreditCardForm() {
  const { control, setValue, clearErrors } = useFormContext<PaymentFormData>()
  const cardholderIdentificationType = useWatch({
    control,
    name: "cardholderIdentificationType",
  })
  const totalValueCart = useBoundStore((state) => state.totalValueCart)

  const selectItems = items.map(({ value, label }) => ({
    value,
    label: label(totalValueCart),
  }))

  return (
    <>
      <Controller
        name="cardNumber"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="form-payment-cardNumber">
              Número do cartão
            </FieldLabel>
            <Input
              {...field}
              id="form-payment-cardNumber"
              value={(field.value ?? "")
                .replace(/\D/g, "")
                .replace(/(\d{4})(?=\d)/g, "$1 ")}
              aria-invalid={fieldState.invalid}
              placeholder="0000 0000 0000 0000"
              inputMode="numeric"
              maxLength={19}
              onChange={(event) => {
                const digits = event.target.value
                  .replace(/\D/g, "")
                  .slice(0, 16)

                field.onChange(digits)
              }}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <Controller
        name="cardholderName"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="form-payment-cardholderName">
              Nome do titular
            </FieldLabel>
            <Input
              {...field}
              id="form-payment-cardholderName"
              aria-invalid={fieldState.invalid}
              placeholder="Ex: Matheus C Silva"
            />
            {fieldState.invalid ? (
              <FieldError errors={[fieldState.error]} />
            ) : (
              <FieldDescription>Conforme aparece no cartão</FieldDescription>
            )}
          </Field>
        )}
      />

      <div className="flex flex-col gap-6 sm:flex-row">
        <Controller
          name="cardExpirationDate"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-payment-cardExpirationDate">
                Data de vencimento
              </FieldLabel>
              <Input
                {...field}
                id="form-payment-cardExpirationDate"
                value={(field.value ?? "")
                  .replace(/\D/g, "")
                  .replace(/(\d{2})(\d{2})/g, "$1/$2")}
                aria-invalid={fieldState.invalid}
                placeholder="00/00"
                inputMode="numeric"
                maxLength={5}
                onChange={(event) => {
                  const digits = event.target.value
                    .replace(/\D/g, "")
                    .slice(0, 4)

                  field.onChange(digits)
                }}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="cardSecurityCode"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-payment-cardSecurityCode">
                Código de segurança
              </FieldLabel>
              <Input
                {...field}
                id="form-payment-cardSecurityCode"
                aria-invalid={fieldState.invalid}
                placeholder="000"
                inputMode="numeric"
                maxLength={3}
                onChange={(event) => {
                  const digits = event.target.value
                    .replace(/\D/g, "")
                    .slice(0, 3)

                  field.onChange(digits)
                }}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <Controller
        name="cardholderIdentification"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="form-payment-cardholderIdentification">
              Documento do titular
            </FieldLabel>
            <InputGroup>
              <InputGroupInput
                {...field}
                id="form-payment-cardholderIdentification"
                value={formatDocument(
                  field.value,
                  cardholderIdentificationType
                )}
                aria-invalid={fieldState.invalid}
                placeholder={
                  cardholderIdentificationType === "cpf"
                    ? "000.000.000-00"
                    : "00.000.000/0000-00"
                }
                autoCapitalize="characters"
                maxLength={cardholderIdentificationType === "cpf" ? 14 : 18}
                onChange={(event) => {
                  const normalized = event.target.value
                    .toUpperCase()
                    .replace(/[^A-Z0-9]/g, "")

                  field.onChange(normalized)
                }}
              />
              <InputGroupAddon align="inline-start">
                <Controller
                  name="cardholderIdentificationType"
                  control={control}
                  render={({ field, fieldState }) => (
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        ref={field.ref}
                        onBlur={field.onBlur}
                        aria-invalid={fieldState.invalid}
                        render={
                          <InputGroupButton
                            variant="ghost"
                            className="pr-1.5! text-xs"
                          />
                        }
                      >
                        {field.value?.toUpperCase() ?? "CPF"}
                        <ChevronDownIcon className="size-3" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        <DropdownMenuRadioGroup
                          value={field.value}
                          onValueChange={(value) => {
                            if (value === field.value) return

                            field.onChange(value)
                            setValue("cardholderIdentification", "")
                            clearErrors("cardholderIdentification")
                          }}
                        >
                          <DropdownMenuRadioItem value="cpf">
                            CPF
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value="cnpj">
                            CNPJ
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                />
              </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      <Controller
        name="installments"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="form-payment-installments">
              Parcelas
            </FieldLabel>
            <Select
              items={selectItems}
              id="form-payment-installments"
              {...field}
              onValueChange={(value) => {
                if (value === field.value) return

                field.onChange(value)
              }}
            >
              <SelectTrigger aria-invalid={fieldState.invalid}>
                <SelectValue placeholder="Selecione o número de parcelas" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {items.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      <div className="flex w-full justify-between gap-6">
                        <span>{item.label(totalValueCart)}</span>
                        <span className="text-green-600">Sem juros</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
    </>
  )
}
