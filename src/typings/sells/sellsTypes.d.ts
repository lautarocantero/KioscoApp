
//──────────────────────────────────────────── 🪧 Dialog 🪧 ───────────────────────────────────────────//

import type { DialogContextType } from "../ui/uiModules";
import type { PaymentMethods } from "./sells";

export type ProductDialogContextType = Pick<DialogContextType, 'showModal' | 'setShowModal'>

export type ProductVariantDialogContextType = Pick<DialogContextType, 'showModal' | 'setShowModal'>

export interface ProductDialogDataInterface {
    productAvailableStock: number,
    productPrice: number,
}

//──────────────────────────────────────────── 🛒 Cart 🛒───────────────────────────────────────────//

export interface CartProductListComponentInterface {
    cart: ProductTicketType[],
}


export interface CartPriceComponentType {
    productsTotalPrice: number,
    ivaPercentage: number,
    ivaAmount: number,
    total: number,
}

export interface CartProductItemComponentInterface {
    product: ProductTicketType,
}

export interface CartProductItemDataComponentInterface {
    name: string | undefined,
    size: string | undefined,
    units: string | undefined,
    price: string | undefined,
}

export interface CartProductItemImageComponentInterface {
    image: string | undefined,
    name: string | undefined,
}

//────────────────────────────────────────── 🔖Ticket 🔖 ─────────────────────────────────────────//

export interface SaleTicketInterface {
  ticket_id: string;
  date: number;
  cashier_name: string;
  cashier_id: string;
  payment_method: PaymentMethods,
  products: ProductTicketType[];
  subtotal: number;
  iva: number;
  total: number;
  currency: string;
}

export interface CartButtonsComponentInterface {
    generateTicket: () => void,
}
