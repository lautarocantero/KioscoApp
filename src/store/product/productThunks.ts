import type { Dispatch }     from "@reduxjs/toolkit";
import type { NavigateFunction } from "react-router-dom";
import type { CreateProductBody, Product }      from "../../typings/product/productTypes";
import {
    checkingProducts,
    checkingCurrentProduct,
    setCurrentProduct,
    setCurrentProductError,
    setError,
    setProducts,
    removeProduct,
} from "./productSlice";
import { handleError }       from "../shared/handlerStoreError";
import {
    getProductsWithPresentationsRequest,
    searchProductsWithPresentationsRequest,
    getProductByIdRequest,
    editProductRequest,
    deleteProductRequest,
} from "../../modules/products/api/productApi";
import { API_URL } from "../../config/api";

// ─── Respuesta de POST /product/create-product ────────────────────────────────
type CreateProductResponse = {
    _id:     string;
    message: string;
};

/*══════════════════════════════════════════════════════════════════════╗
║ 🚀 createProduct                                                      ║
║ 📥 Entrada: body con los campos del producto + navigate               ║
║ ⚙️  Proceso:                                                           ║
║   1. POST /product/create-product                                     ║
║   2. Construye el objeto Product completo con el _id devuelto         ║
║   3. Lo guarda en store con setCurrentProduct (sin nuevo fetch)       ║
║   4. Navega al formulario de variante                                 ║
║ 📤 Salida: Product creado o undefined en caso de error                ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const createProduct = (body: CreateProductBody, navigate: NavigateFunction) => {

    return async (dispatch: Dispatch): Promise<Product | undefined> => {
        dispatch(checkingProducts());

        try {
            const response = await fetch(`${API_URL}/product/create-product`, {
                method:      "POST",
                headers:     { "Content-Type": "application/json" },
                credentials: "include",
                body:        JSON.stringify(body),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData?.message ?? `Error ${response.status}`);
            }

            const data: CreateProductResponse = await response.json();

            const createdProduct: Product = {
                _id:          data._id,
                name:         body.name,
                description:  body.description,
                created_at:   body.created_at,
                updated_at:   body.updated_at,
                image_url:    body.image_url,
                gallery_urls: body.gallery_urls,
                brand:        body.brand,
                presentations:     [], 
            };

            // ─── Guardamos en store → PresentationForm lo leerá desde acá ──
            dispatch(setCurrentProduct(createdProduct));

            // ─── Navegamos al form de variante ────────────────────────────────
            navigate(`/products/${data._id}/variant/new`);

            return createdProduct;

        } catch (error: unknown) {
            dispatch(setError({ errorMessage: "Error al crear el producto" }));
            handleError(error);
        }
    };
};

/*══════════════════════════════════════════════════════════════════════╗
║ 🚀 getProducts                                                        ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const getProducts = () => {

    return async (dispatch: Dispatch): Promise<Product[] | undefined> => {
        dispatch(checkingProducts());
        try {
            const products: Product[] = await getProductsWithPresentationsRequest();

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
║ 🚀 searchProducts                                                     ║
║ 📥 Entrada: term (texto a buscar en el nombre del producto)           ║
║ ⚙️  Proceso:                                                           ║
║   1. GET /product/get-product-by-name?name=term                       ║
║   2. Guarda el resultado en store con setProducts                     ║
║ 📤 Salida: Product[] o undefined en caso de error                     ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const searchProducts = (term: string) => {

    return async (dispatch: Dispatch): Promise<Product[] | undefined> => {
        dispatch(checkingProducts());

        try {
            const products = await searchProductsWithPresentationsRequest(term);
            dispatch(setProducts(products));
            return products;

        } catch (error: unknown) {
            dispatch(setError({ errorMessage: "No se pudieron buscar productos" }));
            handleError(error);
        }
    };
};

/*══════════════════════════════════════════════════════════════════════╗
║ 🚀 getProductById                                                     ║
║ 📥 Entrada: _id                                                        ║
║ ⚙️  Proceso:                                                           ║
║   1. GET /get-product-by-id/:_id                                      ║
║   2. Si ya coincide con el currentProduct del store, evita refetch    ║
║      (esa lógica vive en el hook, no acá)                              ║
║   3. Guarda el resultado en currentProduct sin tocar la lista          ║
║ 📤 Salida: Product o undefined en caso de error                       ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const getProductById = (_id: string) => {

    return async (dispatch: Dispatch): Promise<Product | undefined> => {
        dispatch(checkingCurrentProduct());

        try {
            const product = await getProductByIdRequest(_id);
            dispatch(setCurrentProduct(product));
            return product;

        } catch (error: unknown) {
            dispatch(setCurrentProductError("No se pudo cargar el producto"));
            handleError(error);
        }
    };
};

/*══════════════════════════════════════════════════════════════════════╗
║ 🚀 editProduct                                                        ║
║ 📥 Entrada: producto parcial con _id + los valores editados            ║
║ ⚙️  Proceso:                                                           ║
║   1. PUT /edit-product                                                 ║
║   2. El backend solo devuelve { _id, message }, no el Product completo║
║      así que reconstruimos el objeto con lo que ya teníamos en el     ║
║      store + los campos nuevos enviados                               ║
║   3. Guarda el resultado en currentProduct                             ║
║ 📤 Salida: Product actualizado o undefined en caso de error            ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const editProduct = (body: Partial<Product> & Pick<Product, "_id">) => {

    return async (dispatch: Dispatch, getState: () => { product: { currentProduct: Product | null } }): Promise<Product | undefined> => {
        dispatch(checkingCurrentProduct());

        try {
            await editProductRequest(body);

            // ─── El backend no devuelve el producto completo, así que lo   ───
            // ─── reconstruimos combinando lo que había en store + lo nuevo ───
            const previous = getState().product.currentProduct;
            const updated: Product = {
                ...(previous as Product),
                ...body,
                updated_at: new Date().toISOString(),
            };

            dispatch(setCurrentProduct(updated));
            return updated;

        } catch (error: unknown) {
            dispatch(setCurrentProductError("Error al actualizar el producto"));
            handleError(error);
        }
    };
};

/*══════════════════════════════════════════════════════════════════════╗
║ 🚀 deleteProduct                                                      ║
║ 📥 Entrada: _id                                                        ║
║ ⚙️  Proceso:                                                           ║
║   1. DELETE /delete-product                                            ║
║   2. Saca el producto de la lista en store sin necesidad de refetch   ║
║ 📤 Salida: void                                                        ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const deleteProduct = (_id: string) => {

    return async (dispatch: Dispatch): Promise<void> => {
        try {
            await deleteProductRequest(_id);
            dispatch(removeProduct(_id));

        } catch (error: unknown) {
            dispatch(setError({ errorMessage: "No se pudo eliminar el producto" }));
            handleError(error);
        }
    };
};