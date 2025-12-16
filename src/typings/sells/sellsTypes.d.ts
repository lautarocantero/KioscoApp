
//──────────────────────────────────────────── 🪧 Dialog 🪧 ───────────────────────────────────────────//

export type ProductDialogContextType = Pick<DialogContextType, 'showModal' | 'setShowModal'>

export interface ProductDialogDataInterface {
    productAvailableStock: number,
    productPrice: number,
}