import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import Divider from "@modules/common/components/divider"
import { HttpTypes } from "@medusajs/types"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <div className="border-b border-slate-200 bg-slate-50 py-8 small:py-12">
      <div
        className="content-container px-4 small:px-8 large:px-0"
        data-testid="cart-container"
      >
        {cart?.items?.length ? (
          <div className="grid grid-cols-1 gap-8 large:grid-cols-[minmax(0,1fr)_360px] large:gap-x-20">
            <div className="flex flex-col gap-y-6 border border-slate-200 bg-white p-5 shadow-sm small:p-8">
              {!customer && (
                <>
                  <SignInPrompt />
                  <Divider />
                </>
              )}
              <ItemsTemplate cart={cart} />
            </div>
            <div className="relative">
              <div className="sticky top-24 flex flex-col gap-y-8">
                {cart && cart.region && (
                  <>
                    <div className="border border-slate-200 bg-white p-5 shadow-sm small:p-8">
                      <Summary cart={cart} />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <EmptyCartMessage />
          </div>
        )}
      </div>
    </div>
  )
}

export default CartTemplate
