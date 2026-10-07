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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ChevronRightIcon } from "lucide-react"
import { DeliveryForm } from "./DeliveryForm"
import { Pickup } from "./Pickup"
import { type DeliveryFormData } from "./schema"

interface DeliveryProps {
  onValidForm: () => void
}

export function Delivery({ onValidForm }: DeliveryProps) {
  const { control, watch } = useFormContext<DeliveryFormData>()

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Forma de Entrega</CardTitle>
        <CardDescription>
          Escolha a forma de entrega que deseja utilizar para receber seu pedido
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Controller
            name="method"
            control={control}
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="flex flex-col gap-6 sm:flex-row"
              >
                <FieldLabel htmlFor="delivery-method">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>Frete</FieldTitle>
                      <FieldDescription className="text-green-600">
                        Grátis
                      </FieldDescription>
                    </FieldContent>
                    <RadioGroupItem value="delivery" id="delivery-method" />
                  </Field>
                </FieldLabel>
                <FieldLabel htmlFor="pickup-method">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>Retirada</FieldTitle>
                      <FieldDescription className="text-green-600">
                        Grátis
                      </FieldDescription>
                    </FieldContent>
                    <RadioGroupItem value="pickup" id="pickup-method" />
                  </Field>
                </FieldLabel>
              </RadioGroup>
            )}
          />
          {watch("method", "delivery") === "delivery" ? (
            <DeliveryForm />
          ) : (
            <Pickup />
          )}
        </FieldGroup>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal" className="w-full justify-end">
          <Button onClick={onValidForm}>
            Ir para pagamento
            <ChevronRightIcon />
          </Button>
        </Field>
      </CardFooter>
    </Card>
  )
}
