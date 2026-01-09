import type { ProductTicketType } from "../../seller/sellerTypes";
import type { DialogContextType } from "../../ui/uiModules";
import type { PaymentMethod } from "../enums/sells";


//──────────────────────────────────────────── ⬜ Mode Button ⬛ ───────────────────────────────────────────//

export interface ModeButtonComponentInterface {
    functionAction: () => void,
    text: string,
    icon: React.ReactNode,
}

//──────────────────────────────────────────── 🪧 Dialog 🪧 ───────────────────────────────────────────//

export type ProductDialogContextType = Pick<DialogContextType, 'showModal' | 'setShowModal'>

export type SellDialogContextType = Pick<DialogContextType, 'showModal' | 'setShowModal'>

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

export interface CartPriceLabelInterface {
  label: string
  nestedLabel?: string
  nestedValue?: string
  labelStyles?: (theme: Theme) => object
  nestedStyles?: (theme: Theme) => object
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

export interface CartProductButtonsInterface {
    _id: string,
}

export interface CartProductButtonInterface {
    icon : React.ReactNode, 
    side: CartSide, 
    action: () => void
}

interface DisplayDataComponentInterface {
    nameEdited: string,
    size: string,
    units: string,
    price: string,
}

//────────────────────────────────────────── 🔖Ticket 🔖 ─────────────────────────────────────────//

interface SellEntity {
    ticket_id: string;
    purchase_date: string;
    modification_date: string | null;
    seller_id: string;
    seller_name: string;
    payment_method: PaymentMethod;
    products: ProductVariant[];
    sub_total: number;
    iva: number;
    total_amount: number;
    currency: string;   
}

export type SellTicketType = Pick<SellEntity, 
    'ticket_id' | 
    'purchase_date' | 
    'modification_date' | 
    'seller_id' | 
    'seller_name' | 
    'payment_method' | 
    'products' | 
    'sub_total' | 
    'iva' | 
    'total_amount' | 
    'currency'
    >;

export type Sell = SellEntity;

export interface CartButtonsComponentInterface {
    generateTicket: () => void,
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🍕 SLICE  🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕🍕                       ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

// tipo del slice
export interface SellState { 
    sells: SellTicketType[],
    sellSelected: SellTicketType | null,
    isLoading: boolean,
    errorMessage: string | null,
}

export type SellStateError = Pick <SellState, 'errorMessage'>

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🕐 THUNKS 🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐🕐                     ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type CreateSellRequestPayload = Pick<SellTicketType, 'purchase_date' | 'seller_id' | 'seller_name' | 'payment_method' | 'products' | 'sub_total' | 'iva' | 'total_amount' | 'currency'>

export interface CreateSellSanitizedPayload {
    data: CreateSellRequestPayload;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🔗 API 🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗🔗                          ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type CreateSellApiPayload = Omit<Sell, 'ticket_id' | 'modification_date'>;