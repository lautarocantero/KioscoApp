import type { Dispatch }     from "@reduxjs/toolkit";
import type { NavigateFunction } from "react-router-dom";
import type { CreateProductBody, Product }      from "../../typings/product/productTypes";
import { checkingProducts, setCurrentProduct, setError, setProducts } from "./productSlice";
import { handleError }       from "../shared/handlerStoreError";
import { getProductsRequest, getProductsWithPresentationsRequest, searchProductsWithPresentationsRequest } from "../../modules/products/api/productApi";

const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

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
            const response = await fetch(`${API_BASE_URL}/product/create-product`, {
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

            // ─── Construimos el objeto completo con los datos que ya tenemos ───
            // El backend solo devuelve { _id, message }, así que completamos
            // con los datos del body que acabamos de enviar.
            const createdProduct: Product = {
                _id:          data._id,
                name:         body.name,
                description:  body.description,
                created_at:   body.created_at,
                updated_at:   body.updated_at,
                image_url:    body.image_url,
                gallery_urls: body.gallery_urls,
                brand:        body.brand,
                variants:     [],   // recién creado, sin variantes aún
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