import { Controller, useFormContext } from "react-hook-form"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field"
import { ChevronRightIcon } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { type PaymentFormData } from "./schema"
import { MAX_INSTALLMENTS } from "@/utils/constants"
import { CreditCardForm } from "./CreditCardForm"
import { PixInfo } from "./PixInfo"
import { BarCodeInfo } from "./BarCodeInfo"

interface PaymentProps {
  onValidForm: () => void
}

export function Payment({ onValidForm }: PaymentProps) {
  const { control, watch } = useFormContext<PaymentFormData>()
  const paymentType = watch("paymentType")

  const renderPaymentFields = () => {
    const paymentTypes = {
      "credit-card": <CreditCardForm />,
      pix: <PixInfo />,
      boleto: <BarCodeInfo />,
    }
    return paymentTypes[paymentType] !== undefined
      ? paymentTypes[paymentType]
      : null
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Forma de Pagamento</CardTitle>
        <CardDescription>
          Escolha a forma de pagamento que deseja utilizar para finalizar seu
          pedido
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Controller
            name="paymentType"
            control={control}
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="flex flex-col gap-6 sm:flex-row"
              >
                <FieldLabel htmlFor="credit-card-method">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>Cartão de Crédito</FieldTitle>
                      <FieldDescription className="text-green-600">
                        Até {MAX_INSTALLMENTS}x sem juros
                      </FieldDescription>
                    </FieldContent>
                    <RadioGroupItem
                      value="credit-card"
                      id="credit-card-method"
                    />
                  </Field>
                </FieldLabel>
                <FieldLabel htmlFor="pix-method">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>Pix</FieldTitle>
                      <FieldDescription className="text-green-600">
                        Aprovação imediata
                      </FieldDescription>
                    </FieldContent>
                    <RadioGroupItem value="pix" id="pix-method" />
                  </Field>
                </FieldLabel>
                <FieldLabel htmlFor="boleto-method">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>Boleto</FieldTitle>
                      <FieldDescription>
                        Aprovação em 2 dias úteis
                      </FieldDescription>
                    </FieldContent>
                    <RadioGroupItem value="boleto" id="boleto-method" />
                  </Field>
                </FieldLabel>
              </RadioGroup>
            )}
          />
          {renderPaymentFields()}
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal" className="w-full justify-end">
          <Button onClick={onValidForm}>
            Finalizar pedido
            <ChevronRightIcon />
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
