import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Controller, useFormContext } from "react-hook-form"
import type { DeliveryFormData } from "./schema"

export function FieldDelivery({ randomDay }: { randomDay: number }) {
  const { control, watch } = useFormContext<DeliveryFormData>()
  const cep = watch("cep")
  if (!cep || cep.length !== 9) return null

  return (
    <div className="flex flex-col gap-6 sm:flex-row">
      <Controller
        name="delivery"
        control={control}
        render={({ field }) => (
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            className="max-w-sm"
          >
            <FieldLabel htmlFor="sedex-delivery">
              <Field orientation="horizontal">
                <FieldContent>
                  <FieldTitle>Chegará em {randomDay} dias úteis</FieldTitle>
                  <FieldDescription>
                    <span className="text-green-600">Grátis</span>
                  </FieldDescription>
                </FieldContent>
                <RadioGroupItem value="sedex" id="sedex-delivery" />
              </Field>
            </FieldLabel>
          </RadioGroup>
        )}
      />
    </div>
  )
}
