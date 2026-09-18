import { Container, Heading, Text } from "@modules/common/components/ui"

import { isManual, isStripeLike, paymentInfoMap } from "@lib/constants"
import { getStorefrontContent } from "@lib/content/storefront"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"

type PaymentDetailsProps = {
  order: HttpTypes.StoreOrder
}

const PaymentDetails = ({ order }: PaymentDetailsProps) => {
  const content = getStorefrontContent()
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
                {paymentInfoMap[payment.provider_id]?.title ||
                  payment.provider_id}
              </Text>
            </div>
            <div className="flex flex-col rounded-md border border-slate-200 bg-slate-50 p-4 small:col-span-2">
              <Text className="txt-medium-plus text-ui-fg-base mb-1">
                Detalhes do pagamento
              </Text>
              <div className="flex gap-2 txt-medium text-ui-fg-subtle items-center">
                <Container className="flex items-center h-7 w-fit p-2 bg-ui-button-neutral-hover">
                  {paymentInfoMap[payment.provider_id]?.icon}
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
            {isManual(payment.provider_id) && (
              <div className="rounded-md border border-sky-100 bg-sky-50 p-4 small:col-span-3">
                <Text className="txt-medium-plus text-ui-fg-base mb-2">
                  {content.checkout.bankTransfer.confirmationTitle}
                </Text>
                <p className="text-sm text-slate-600">
                  {content.checkout.bankTransfer.confirmationText}
                </p>
                <div className="mt-4 grid gap-3 small:grid-cols-2">
                  <div>
                    <p className="text-small-semi uppercase tracking-[0.12em] text-slate-500">
                      {content.checkout.bankTransfer.accountHolderLabel}
                    </p>
                    <p className="mt-1 font-semibold text-slate-950">
                      {content.checkout.bankTransfer.accountHolder}
                    </p>
                  </div>
                  <div>
                    <p className="text-small-semi uppercase tracking-[0.12em] text-slate-500">
                      {content.checkout.bankTransfer.ibanLabel}
                    </p>
                    <p className="mt-1 font-semibold text-slate-950">
                      {content.checkout.bankTransfer.iban}
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-xs leading-5 text-slate-500">
                  {content.checkout.bankTransfer.note}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

    </section>
  )
}

export default PaymentDetails
