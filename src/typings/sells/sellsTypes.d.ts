

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🪧 Dialog 🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧  ║
// ╚══════════════════════════════════════════════════════════════════════╝*/

export type ProductDialogContextType = Pick<DialogContextType, 'showModal' | 'setShowModal'> & {
    productData: Product | null,
    setProductData: Dispatch<SetStateAction<Product | null>>;
}

export interface ProductDialogDataInterface {
    productAvailableStock: number,
    productPrice: number,
}