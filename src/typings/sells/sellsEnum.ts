// /*══════════════════════════════════════════════════════════════════════╗
// ║ 📑 PAYMENT METHODS 📑📑📑📑📑📑📑📑📑📑📑📑📑📑📑                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export enum PaymentMethod {
  Transfer = 'transfer',
  Cash = 'cash',
  Debit = 'debit',
  Credit = 'credit',
}

export const PAYMENT_METHOD_VALUES = Object.values(PaymentMethod);

// Monedas oficiales de los países de América — usadas en Ajustes > Mi tienda > Moneda.
export enum Currency {
  Ars = 'ars',
  Usd = 'usd',
  Cad = 'cad',
  Mxn = 'mxn',
  Brl = 'brl',
  Clp = 'clp',
  Cop = 'cop',
  Pen = 'pen',
  Uyu = 'uyu',
  Bob = 'bob',
  Pyg = 'pyg',
  Ves = 'ves',
  Gtq = 'gtq',
  Hnl = 'hnl',
  Nio = 'nio',
  Crc = 'crc',
  Pab = 'pab',
  Dop = 'dop',
  Gyd = 'gyd',
  Srd = 'srd',
  Ttd = 'ttd',
  Jmd = 'jmd',
  Bsd = 'bsd',
  Bbd = 'bbd',
  Bzd = 'bzd',
  Htg = 'htg',
  Xcd = 'xcd',
  Awg = 'awg',
  Ang = 'ang',
}

export enum SellStatusEnum {
    Completada = 'completada',
    Parcial = 'parcial',
}

export enum SellFilterEnum {
    All = 'all',
    Completada = 'completada',
    Parcial = 'parcial',
}