import { Container, Heading, Text } from "@modules/common/components/ui"

import { isStripeLike, paymentInfoMap } from "@lib/constants"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type PaymentDetailsProps = {
  order: HttpTypes.StoreOrder
}

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
  const payment = order.payment_collections?.[0].payments?.[0]
  const paymentDate = payment?.created_at
    ? new Date(payment.created_at).toLocaleString("pt-PT")
    : ""

  return (
    <section className="border-t border-slate-200 p-6 small:p-10">
      <Heading level="h2" className="flex flex-row text-3xl-regular">
        Pagamento
      </Heading>
      <div className="mt-5">
        {payment && (
          <div className="grid w-full gap-4 small:grid-cols-3">
            <div className="flex flex-col rounded-md border border-slate-200 bg-slate-50 p-4">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                Método de pagamento
              </Text>
              <Text
                className="txt-medium text-ui-fg-subtle"
                data-testid="payment-method"
              >
                {paymentInfoMap[payment.provider_id].title}
              </Text>
            </div>
            <div className="flex flex-col rounded-md border border-slate-200 bg-slate-50 p-4 small:col-span-2">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                Detalhes do pagamento
              </Text>
              <div className="flex gap-2 txt-medium text-ui-fg-subtle items-center">
                <Container className="flex items-center h-7 w-fit p-2 bg-ui-button-neutral-hover">
                  {paymentInfoMap[payment.provider_id].icon}
                </Container>
                <Text data-testid="payment-amount">
                  {isStripeLike(payment.provider_id) && payment.data?.card_last4
                    ? `**** **** **** ${payment.data.card_last4}`
                    : `${convertToLocale({
                        amount: payment.amount,
                        currency_code: order.currency_code,
                      })} pago em ${paymentDate}`}
                </Text>
              </div>
            </div>
          </div>
        )}
      </div>

    </section>
  )
}

export default PaymentDetails
