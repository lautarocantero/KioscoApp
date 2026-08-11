import type { Dispatch } from "@reduxjs/toolkit";
import { z } from "zod";
import type { addOneUnitThunkInterface, AddToCartThunkInterface, removeFromCartInterface, SelectPresentationThunkInterface, SelectProductThunkInterface, SellerStateInterface, setQuantityThunkInterface } from "../../typings/seller/sellerTypes";
import { handleError } from "../shared/handlerStoreError";
import { addToCartAction, addUnitAction, cleanCart, removeFromCart, resetProducts, setError, setExactMatch, setPresentationSelected, setProducts, setProductSelected, setQuantityAction, setSearchTerm, setSelectedCategory, startLoadingProducts } from "./sellerSlice";
import type { Presentation } from "@typings/presentation/presentationTypes";
import { resetPresentations, setPresentations, startLoadingPresentations } from "./sellerSlice";
import { getPresentationsWithStockByProductIdRequest } from "../../modules/presentations/api/presentationsApi";
import type { ProductWithPresentations } from "@typings/product/productTypes";
import type { PresentationCategory } from "@typings/presentation/presentationEnum";
import { getProductsWithStockRequest, searchProductsWithPresentationsRequest } from "../../modules/products/api/productApi";

export const PresentationEntitySchema = z.object({
  _id: z.string().nullable(),
  name: z.string(),
  description: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  image_url: z.string(),
  brand: z.string(),
  product_id: z.string(),
  sku: z.string(),
  model_type: z.string(),
  model_size: z.number(),
  min_stock: z.number(),
  stock: z.number(),
  price: z.number(),
  expiration_date: z.string(),
});

export const ProductTicketSchema = z.object({
  _id: z.string().nullable(),
  name: z.string(),
  description: z.string(),
  image_url: z.string(),
  brand: z.string(),
  sku: z.string(),
  model_type: z.string().nullable().optional(),
  model_size: z.number(),
  price: z.number(),
  expiration_date: z.string(),
  stock_required: z.number(),
});

export type PresentationEntity = z.infer<typeof PresentationEntitySchema>;

export const selectPresentationThunk = ({ presentationData }: SelectPresentationThunkInterface) => {
    return async (dispatch: Dispatch): Promise<void> => {

        if (!presentationData) {
            dispatch(setError({ errorMessage: "No se ha proporcionado una presentación."}));
            return;
        }

        try{
            dispatch(setPresentationSelected({ presentation: presentationData }));
        } catch(error: unknown) {
            handleError(error);
        }
    }
}

export const selectProductThunk = ({ productData }: SelectProductThunkInterface) => {
    return async (dispatch: Dispatch): Promise<void> => {

        if (!productData) {
            dispatch(setError({ errorMessage: "No se ha proporcionado un producto."}));
            return;
        }

        // if( ! PresentationEntitySchema.safeParse(productData).success ) {
            // dispatch(setError({ errorMessage: "El producto no es valido."}));
            // return;
        // }

        try{
            dispatch(setProductSelected({ product: productData}));
        } catch(error: unknown) {
            handleError(error);
        }
    }
}

export const addToCartThunk = ({ productData }: AddToCartThunkInterface ) => {
    return async (dispatch: Dispatch): Promise<boolean> => {
        if (!productData) {
            dispatch(setError({ errorMessage: "No se ha proporcionado un producto."}));
            return false;
        }


        const parsed = ProductTicketSchema.safeParse(productData);
        if (!parsed.success) {
            dispatch(setError({ errorMessage: "El producto no es valido."}));
            return false;
        }

        try {
            dispatch(addToCartAction({ product: productData }));
            return true;
        } catch (error: unknown) {
            handleError(error);
            return false;
        }
    }
}

export const addOneUnitThunk = ({_id}: addOneUnitThunkInterface ) => {

    return async (dispatch:Dispatch): Promise<void> => {
        if(!_id) {
            dispatch(setError({ errorMessage: "No se ha proporcionado un producto."}));
            return;
        }

        try{
            dispatch(addUnitAction({ _id: _id}));
        } catch (error: unknown) {
            handleError(error);
        }
    }
}

export const setQuantityThunk = ({ _id, stock_required }: setQuantityThunkInterface) => {
    return async (dispatch: Dispatch): Promise<void> => {
        if (!_id) {
            dispatch(setError({ errorMessage: "No se ha proporcionado un producto."}));
            return;
        }

        try {
            dispatch(setQuantityAction({ _id, stock_required }));
        } catch (error: unknown) {
            handleError(error);
        }
    }
}

export const removeFromCartThunk = ({_id, amount}: removeFromCartInterface) => {
    return async (dispatch: Dispatch): Promise<void> => {
        try{
            dispatch(removeFromCart({_id, amount}));
        } catch(error: unknown) {
            handleError(error);
        }
    }
}

export const cleanCartThunk = () => {

    return async (dispatch: Dispatch): Promise<void> => {
        try{
            dispatch(cleanCart());
        } catch(error: unknown) {
            handleError(error);
        }
    }

}

/*══════════════════════════════════════════════════════════════════════╗
║ 🚀 setSearchTermThunk                                                  ║
║ ⚠️  Uso: EXCLUSIVO del buscador de new sell page.                      ║
║ ⚙️  Proceso: despacha el nuevo searchTerm hacia seller.searchTerm.     ║
╚══════════════════════════════════════════════════════════════════════*/
export const setSearchTermThunk = (searchTerm: string) => {
    return async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(setSearchTerm(searchTerm));
        } catch (error: unknown) {
            handleError(error);
        }
    }
}

/*══════════════════════════════════════════════════════════════════════╗
║ 🚀 clearSearchTermThunk                                                ║
║ ⚠️  Uso: EXCLUSIVO del botón de limpiar búsqueda en new sell page.     ║
║ ⚙️  Proceso: resetea seller.searchTerm a "".                          ║
╚══════════════════════════════════════════════════════════════════════*/
export const clearSearchTermThunk = () => {
    return async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(setSearchTerm(""));
        } catch (error: unknown) {
            handleError(error);
        }
    }
}

/*══════════════════════════════════════════════════════════════════════╗
║ 🚀 setSelectedCategoryThunk                                            ║
║ ⚠️  Uso: EXCLUSIVO del filtro de categoría en new sell page.           ║
║ ⚙️  Proceso: despacha la categoría elegida hacia seller.selectedCategory║
╚══════════════════════════════════════════════════════════════════════*/
export const setSelectedCategoryThunk = (category: PresentationCategory | null) => {
    return async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(setSelectedCategory(category));
        } catch (error: unknown) {
            handleError(error);
        }
    }
}

/*══════════════════════════════════════════════════════════════════════╗
║ 🚀 setExactMatchThunk                                                  ║
║ ⚠️  Uso: EXCLUSIVO del checkbox "búsqueda exacta" en new sell page.    ║
║ ⚙️  Proceso: despacha el nuevo valor hacia seller.exactMatch.         ║
╚══════════════════════════════════════════════════════════════════════*/
export const setExactMatchThunk = (exactMatch: boolean) => {
    return async (dispatch: Dispatch): Promise<void> => {
        try {
            dispatch(setExactMatch(exactMatch));
        } catch (error: unknown) {
            handleError(error);
        }
    }
}

/*══════════════════════════════════════════════════════════════════════╗
║ 🚀 fetchSellerProductsWithStock                                        ║
║ ⚠️  Uso: EXCLUSIVO del listado de productos en new sell page.          ║
║     Copia de getProductsWithStock (product domain) pero despachando    ║
║     acciones de sellerSlice, para no acoplar el flujo de venta al      ║
║     store de products (usado también en administración).               ║
║ ⚙️  Proceso:                                                            ║
║   1. Resetea products del seller antes de pedir (evita flash de        ║
║      "todos los productos" antes de los filtrados por stock)           ║
║   2. GET /get-products-with-stock                                      ║
║   3. Guarda el resultado en seller.products                            ║
║ 📤 Salida: ProductWithPresentations[] o undefined en caso de error     ║
╚══════════════════════════════════════════════════════════════════════*/
export const fetchSellerProductsWithStock = () => {
    return async (dispatch: Dispatch): Promise<ProductWithPresentations[] | undefined> => {
        dispatch(resetProducts());
        dispatch(startLoadingProducts());
        try {
            const products: ProductWithPresentations[] = await getProductsWithStockRequest();

            if (!products) {
                dispatch(setError({ errorMessage: "No se ha encontrado ningun producto" }));
                throw new Error("No se encontraron productos");
            }

            dispatch(setProducts(products));
            return products;
        } catch (error: unknown) {
            dispatch(setError({ errorMessage: "No se pudieron obtener los productos" }));
            handleError(error);
        }
    };
};

/*══════════════════════════════════════════════════════════════════════╗
║ 🚀 fetchSellerProducts                                                 ║
║ ⚠️  Uso: EXCLUSIVO del listado de venta. Reemplaza la necesidad de      ║
║     que useSellerProductsListData decida qué request llamar — el       ║
║     thunk lee categoría/búsqueda/exactMatch directo del propio         ║
║     state.seller, así queda todo centralizado en el dominio seller     ║
║     (sin tocar product.products ni sus thunks/acciones).               ║
║ ⚙️  Proceso:                                                            ║
║   1. Lee selectedCategory / searchTerm / exactMatch de getState().seller║
║   2. Si hay categoría o término activo -> búsqueda filtrada            ║
║      (reusa searchProductsWithPresentationsRequest, solo la función    ║
║      de request HTTP, no el store de product)                          ║
║   3. Si no hay filtro activo -> trae todo lo disponible con stock      ║
║   4. Guarda siempre en seller.products                                 ║
║ 📤 Salida: ProductWithPresentations[] o undefined en caso de error     ║
╚══════════════════════════════════════════════════════════════════════*/
export const fetchSellerProducts = () => {
    return async (
        dispatch: Dispatch,
        getState: () => { seller: SellerStateInterface },
    ): Promise<ProductWithPresentations[] | undefined> => {
        dispatch(resetProducts());
        dispatch(startLoadingProducts());

        try {
            const { selectedCategory, searchTerm, exactMatch } = getState().seller;
            const hasActiveFilter = searchTerm.trim() !== "" || !!selectedCategory;

            const products: ProductWithPresentations[] = hasActiveFilter
                ? await searchProductsWithPresentationsRequest(searchTerm, selectedCategory ?? undefined, exactMatch)
                : await getProductsWithStockRequest();

            if (!products) {
                dispatch(setError({ errorMessage: "No se ha encontrado ningun producto" }));
                throw new Error("No se encontraron productos");
            }

            dispatch(setProducts(products));
            return products;
        } catch (error: unknown) {
            dispatch(setError({ errorMessage: "No se pudieron obtener los productos" }));
            handleError(error);
        }
    };
};

/*══════════════════════════════════════════════════════════════════════╗
║ 🚀 fetchCartPresentationsByProductId                                   ║
║ ⚠️  Uso: EXCLUSIVO del picker de presentaciones en new sell page.      ║
║     Copia de fetchPresentationsWithStockByProductId (presentation      ║
║     domain) pero despachando acciones de sellerSlice, para no          ║
║     acoplar el flujo de venta al store de presentations.               ║
║ 📥 Entrada: product_id                                                 ║
║ ⚙️  Proceso:                                                            ║
║   1. Resetea presentations del carrito antes de pedir (evita flash     ║
║      de presentaciones del producto anterior)                          ║
║   2. GET /presentations-with-stock por product_id                      ║
║   3. Guarda el resultado en seller.presentations                       ║
║ 📤 Salida: Presentation[] o undefined en caso de error                 ║
╚══════════════════════════════════════════════════════════════════════*/
export const fetchCartPresentationsByProductId = (product_id: string) => {
    return async (dispatch: Dispatch): Promise<Presentation[] | undefined> => {
        dispatch(resetPresentations());
        dispatch(startLoadingPresentations());
        try {
            const presentations = await getPresentationsWithStockByProductIdRequest({ product_id });
            dispatch(setPresentations(presentations));
            return presentations;
        } catch (error: unknown) {
            dispatch(setError({ errorMessage: "No se pudieron cargar las presentaciones" }));
            handleError(error);
        }
    };
};