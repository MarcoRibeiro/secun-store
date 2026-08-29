import { Heading } from "@modules/common/components/ui"
import { cookies as nextCookies } from "next/headers"
import { CheckCircleSolid } from "@medusajs/icons"

import CartTotals from "@modules/common/components/cart-totals"
import Help from "@modules/order/components/help"
import Items from "@modules/order/components/items"
import OnboardingCta from "@modules/order/components/onboarding-cta"
import OrderDetails from "@modules/order/components/order-details"
import ShippingDetails from "@modules/order/components/shipping-details"
import PaymentDetails from "@modules/order/components/payment-details"
import { HttpTypes } from "@medusajs/types"

type OrderCompletedTemplateProps = {
  order: HttpTypes.StoreOrder
}

export default async function OrderCompletedTemplate({
  order,
}: OrderCompletedTemplateProps) {
  const cookies = await nextCookies()

  const isOnboarding = cookies.get("_medusa_onboarding")?.value === "true"

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 py-10 small:py-14">
      <div className="content-container flex h-full w-full max-w-4xl flex-col items-center justify-center gap-y-10 px-4 small:px-8 large:px-0">
        {isOnboarding && <OnboardingCta orderId={order.id} />}
        <div
          className="flex h-full w-full max-w-4xl flex-col overflow-hidden border border-slate-200 bg-white shadow-sm"
          data-testid="order-complete-container"
        >
          <div className="border-b border-slate-200 bg-[linear-gradient(135deg,#ffffff_0%,#f8fafc_55%,#e0f2fe_100%)] p-6 small:p-10">
            <div className="flex flex-col gap-5 small:flex-row small:items-start">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sky-600 text-white">
                <CheckCircleSolid />
              </div>
              <div>
                <p className="text-small-semi uppercase tracking-[0.16em] text-sky-600">
                  Encomenda confirmada
                </p>
                <Heading
                  level="h1"
                  className="mt-3 flex flex-col gap-y-2 text-3xl text-slate-950 small:text-[40px] small:leading-tight"
                >
                  <span>Obrigado pela tua compra.</span>
                  <span>A encomenda foi registada com sucesso.</span>
                </Heading>
              </div>
            </div>
            <div className="mt-8">
              <OrderDetails order={order} />
            </div>
          </div>

          <section className="p-6 small:p-10">
            <Heading level="h2" className="flex flex-row text-3xl-regular">
              Resumo
            </Heading>
            <div className="mt-4 overflow-hidden rounded-md border border-slate-200">
              <Items order={order} />
            </div>
            <div className="mt-6 rounded-md border border-slate-200 bg-slate-50 p-5">
              <CartTotals totals={order} />
            </div>
          </section>

          <ShippingDetails order={order} />
          <PaymentDetails order={order} />
          <Help />
        </div>
      </div>
    </div>
  )
}
