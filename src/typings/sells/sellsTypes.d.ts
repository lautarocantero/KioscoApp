import type { DialogContextType } from "../ui/uiModules";
import type { PaymentMethods } from "./sells";


//──────────────────────────────────────────── ⬜ Mode Button ⬛ ───────────────────────────────────────────//

export interface ModeButtonComponentInterface {
    functionAction: () => void,
    text: string,
    icon: React.ReactNode,
}

//──────────────────────────────────────────── 🪧 Dialog 🪧 ───────────────────────────────────────────//

export type ProductDialogContextType = Pick<DialogContextType, 'showModal' | 'setShowModal'>

export type ProductVariantDialogContextType = Pick<DialogContextType, 'showModal' | 'setShowModal'>

export interface ProductDialogDataInterface {
    productAvailableStock: number,
    productPrice: number,
}

export interface ProductDialogIlustrationInterface {
    name?: string;
    image_url?: string;
}

export type ProductDialogImageComponentType = Pick<ProductDialogIlustrationInterface, 'name' | 'image_url'>

export interface ProductVariantDialogComponentInterface {
    id: string,
    setBarcode: SetStateAction<string>,
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
