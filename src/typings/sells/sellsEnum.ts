//─────────────────────────────── Payment Methods ───────────────────────────────//

export enum PaymentMethod {
  Transfer = 'transfer',
  Cash = 'cash',
  Debit = 'debit',
  Credit = 'credit',
}

export const PAYMENT_METHOD_VALUES = Object.values(PaymentMethod);

export enum Currency {
  Ars = 'ars',
  Usd = 'usd',
}

export enum PaymentStatusEnum {
  Total = 'total',
  Parcial = 'parcial',
}

export enum SellStatusEnum {
    Completada = 'completada',
    Parcial = 'parcial',
}