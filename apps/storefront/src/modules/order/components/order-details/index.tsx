import { HttpTypes } from "@medusajs/types"
import { Text } from "@modules/common/components/ui"

type OrderDetailsProps = {
  order: HttpTypes.StoreOrder
  showStatus?: boolean
}

const OrderDetails = ({ order, showStatus }: OrderDetailsProps) => {
  const formatStatus = (str: string) => {
    const labels: Record<string, string> = {
      canceled: "Cancelada",
      captured: "Pago",
      fulfilled: "Enviada",
      not_fulfilled: "Por enviar",
      not_paid: "Por pagar",
      paid: "Pago",
      partially_fulfilled: "Parcialmente enviada",
      pending: "Pendente",
      requires_action: "Requer ação",
    }

    if (labels[str]) {
      return labels[str]
    }

    const formatted = str.split("_").join(" ")

    return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
  }

  return (
    <div className="grid gap-4 text-slate-600 small:grid-cols-3">
      <Text className="small:col-span-3">
        Enviámos os detalhes da encomenda para{" "}
        <span
          className="font-semibold text-slate-950"
          data-testid="order-email"
        >
          {order.email}
        </span>
        .
      </Text>
      <Text>
        <span className="block text-small-semi uppercase tracking-[0.12em] text-slate-500">
          Data
        </span>
        <span data-testid="order-date">
          {new Date(order.created_at).toLocaleDateString("pt-PT", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </span>
      </Text>
      <Text>
        <span className="block text-small-semi uppercase tracking-[0.12em] text-slate-500">
          Encomenda
        </span>
        <span className="font-semibold text-sky-700" data-testid="order-id">
          #{order.display_id}
        </span>
      </Text>

      <div className="flex items-center gap-x-4 text-compact-small">
        {showStatus && (
          <>
            <Text>
              Estado:{" "}
              <span className="text-ui-fg-subtle " data-testid="order-status">
                {formatStatus(order.fulfillment_status)}
              </span>
            </Text>
            <Text>
              Pagamento:{" "}
              <span
                className="text-ui-fg-subtle "
                sata-testid="order-payment-status"
              >
                {formatStatus(order.payment_status)}
              </span>
            </Text>
          </>
        )}
      </div>
    </div>
  )
}

export default OrderDetails
