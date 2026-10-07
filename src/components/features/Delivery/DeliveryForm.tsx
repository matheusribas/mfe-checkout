import { useEffect } from "react"
import { Controller, useFormContext } from "react-hook-form"
import type { DeliveryFormData } from "./schema"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useMutationPerCep } from "@/api/hooks/via-cep/useMutationPerCep"
import { sanitizedCep } from "@/utils/sanitize"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "@/components/ui/toast"
import { FieldDelivery } from "./FieldDelivery"
import { useBoundStore } from "@/stores"

export function DeliveryForm() {
  const { setValue, clearErrors, control } = useFormContext<DeliveryFormData>()
  const { mutateAsync, data, isPending, isError } = useMutationPerCep()
  const setDaysOfDelivery = useBoundStore((state) => state.setDaysOfDelivery)

  const isErrorCepData = !!(data && "erro" in data) || isError
  const cepData = data && !isErrorCepData ? data : undefined

  useEffect(() => {
    if (!isErrorCepData) return
    toast.add({
      type: "error",
      priority: "high",
      title: "Cep não encontrado",
      description: "Tente novamente com outro cep",
    })

    setValue("adress", "")
    setValue("uf", "")
    setValue("city", "")
    clearErrors(["adress", "uf", "city"])
  }, [isErrorCepData, setValue, clearErrors])

  useEffect(() => {
    if (!cepData) return

    setValue("adress", cepData.logradouro)
    setValue("uf", cepData.uf)
    setValue("city", cepData.localidade)
    clearErrors(["number", "adress", "uf", "city"])
  }, [cepData, setValue, clearErrors])

  return (
    <>
      <Controller
        name="cep"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="form-delivery-cep">CEP</FieldLabel>
            <InputGroup>
              <InputGroupInput
                {...field}
                id="form-delivery-cep"
                type="text"
                inputMode="numeric"
                maxLength={9}
                aria-invalid={fieldState.invalid}
                placeholder="00000-000"
                onChange={(event) => {
                  const digits = event.target.value
                    .replace(/\D/g, "")
                    .slice(0, 8)
                  const cep =
                    digits.length > 5
                      ? `${digits.slice(0, 5)}-${digits.slice(5)}`
                      : digits

                  field.onChange(cep)

                  if (
                    digits.length === 8 &&
                    digits !==
                      (field.value ? field.value.replace(/\D/g, "") : "")
                  ) {
                    mutateAsync(sanitizedCep(digits))
                      .then((response) => {
                        setDaysOfDelivery(
                          "erro" in response
                            ? 1
                            : Math.floor(Math.random() * 10) + 1
                        )
                      })
                      .catch(() => setDaysOfDelivery(1))
                  }
                }}
              />
              <InputGroupAddon align="inline-end" hidden={!isPending}>
                <Spinner />
              </InputGroupAddon>
            </InputGroup>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />
      <div className="flex flex-col gap-6 sm:flex-row">
        <Controller
          name="adress"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-delivery-adress">Endereço</FieldLabel>
              <Input
                {...field}
                id="form-delivery-adress"
                aria-invalid={fieldState.invalid}
                placeholder="Rua Exemplo"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="number"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="sm:w-42">
              <FieldLabel htmlFor="form-delivery-number">Número</FieldLabel>
              <Input
                {...field}
                id="form-delivery-number"
                aria-invalid={fieldState.invalid}
                placeholder="000"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <div className="flex flex-col gap-6 sm:flex-row">
        <Controller
          name="uf"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="sm:w-42">
              <FieldLabel htmlFor="form-delivery-uf">Estado</FieldLabel>
              <Input
                {...field}
                id="form-delivery-uf"
                placeholder="XX"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="city"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-delivery-city">Cidade</FieldLabel>
              <Input
                {...field}
                id="form-delivery-city"
                aria-invalid={fieldState.invalid}
                placeholder="XXX XXXXX"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </div>
      <Controller
        name="complement"
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor="form-delivery-complement">
              Complemento
            </FieldLabel>
            <Input
              {...field}
              id="form-delivery-complement"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )}
      />

      {!isErrorCepData && <FieldDelivery />}
    </>
  )
}
