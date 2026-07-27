import { PaymentMethod } from "./sellsEnum";

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  [PaymentMethod.Transfer]: "Transferencia",
  [PaymentMethod.Cash]: "Efectivo",
  [PaymentMethod.Debit]: "Débito",
  [PaymentMethod.Credit]: "Crédito",
};