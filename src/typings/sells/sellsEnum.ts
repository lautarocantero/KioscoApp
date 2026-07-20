//─────────────────────────────── Payment Methods ───────────────────────────────//

export enum PaymentMethod {
  Transfer = 'Transferencia',
  Cash = 'Efectivo',
  Debit = 'Débito',
  Credit = 'Crédito'
}

export enum Currency {
  Ars = 'ars',
  Usd = 'usd',
}

export enum SellStatusEnum {
  Completada = 'completada',
  Parcial = 'parcial',
}