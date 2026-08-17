import type { Dispatch } from "@reduxjs/toolkit";
import type { NavigateFunction } from "react-router-dom";
import type { CreateProductBody, Product, ProductStats, ProductWithPresentations } from "../../typings/product/productTypes";
import {
    checkingProducts,
    checkingCurrentProduct,
    setCurrentProduct,
    setCurrentProductError,
    setError,
    setProducts,
    removeProduct,
    checkingStats,
    setStats,
    setStatsError,
    resetProducts,
    checkingAllProducts,
    setAllProducts,
    setAllProductsError,
} from "./productSlice";
import { handleError }       from "../shared/handlerStoreError";
import {
    getProductsRequest,
    getProductsWithPresentationsRequest,
    searchProductsWithPresentationsRequest,
    getProductByIdRequest,
    createProductRequest,
    editProductRequest,
    deleteProductRequest,
    getProductStatsRequest,
    getProductsWithStockRequest,
} from "../../modules/products/api/productApi";
import type { PresentationCategory } from "@typings/presentation/presentationEnum";

/*══════════════════════════════════════════════════════════════════════╗
║ 🚀 createProduct                                                      ║
║ 📥 Entrada: body con los campos del producto + navigate               ║
║ ⚙️  Proceso:                                                           ║
║   1. POST /product/create-product (via productApi)                    ║
║   2. Construye el objeto Product completo con el _id devuelto         ║
║   3. Lo guarda en store con setCurrentProduct (sin nuevo fetch)       ║
║   4. Navega al formulario de variante                                 ║
║ 📤 Salida: Product creado o undefined en caso de error                ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const createProduct = (body: CreateProductBody, navigate?: NavigateFunction) => {

    return async (dispatch: Dispatch): Promise<Product | undefined> => {
        dispatch(checkingProducts());

        try {
            const data = await createProductRequest(body);

            const createdProduct: Product = {
                _id:          data._id,
                name:         body.name,
                description:  body.description,
                created_at:   body.created_at,
                updated_at:   body.updated_at,
                image_url:    body.image_url,
                brand:        body.brand,
                presentations:     [],
            };

            dispatch(setCurrentProduct(createdProduct));
            navigate?.(`/products/${data._id}/variant/new`);

            return createdProduct;

        } catch (error: unknown) {
            dispatch(setError({ errorMessage: "Error al crear el producto" }));
            handleError(error);
            throw error;
        }
    };
};

/*══════════════════════════════════════════════════════════════════════╗
║ 🚀 getProducts                                                        ║
║ ⚠️  Nota: /get-products-with-presentations devuelve ProductWithPresentations[]║
║     (presentations resumidas), NO Product[] completos. El tipo del    ║
║     thunk debe reflejar eso — ver productSlice.ProductState.products. ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const getProducts = () => {

    return async (dispatch: Dispatch): Promise<ProductWithPresentations[] | undefined> => {
        dispatch(checkingProducts());
        try {
            const products: ProductWithPresentations[] = await getProductsWithPresentationsRequest();

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
║ 🚀 fetchAllProductsThunk                                               ║
║ ⚠️  Uso: reporte de reposición de /shop, para resolver el nombre del   ║
║     producto padre de cada presentación con stock bajo. GET /get-products║
║     no filtra por stock ni trae presentations — es el listado liviano  ║
║     completo, guardado aparte (`allProducts`) para no pisar `products` ║
║     (que en /shop ya usa `getProductsWithStock`, un listado filtrado). ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const fetchAllProductsThunk = () => {
    return async (dispatch: Dispatch): Promise<Product[] | undefined> => {
        dispatch(checkingAllProducts());
        try {
            const products = await getProductsRequest();
            dispatch(setAllProducts(products));
            return products;
        } catch (error: unknown) {
            dispatch(setAllProductsError("No se pudieron cargar los productos"));
            handleError(error);
        }
    };
};

/*══════════════════════════════════════════════════════════════════════╗
║ 🚀 getProductsWithStock                                               ║
║ ⚠️  Idéntico a getProducts, pero contra /get-products-with-stock,     ║
║     que ya viene filtrado en backend por presentations con stock > 0. ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const getProductsWithStock = () => {
    return async (dispatch: Dispatch): Promise<ProductWithPresentations[] | undefined> => {
        dispatch(resetProducts());
        dispatch(checkingProducts());
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
║ 🚀 searchProducts                                                     ║
║ 📥 Entrada: term (texto a buscar en el nombre del producto)           ║
║ ⚙️  Proceso:                                                           ║
║   1. GET /product/get-product-by-name?name=term                       ║
║   2. Guarda el resultado en store con setProducts                     ║
║ 📤 Salida: ProductWithPresentations[] o undefined en caso de error    ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const searchProducts = (term: string, category?: PresentationCategory) => {

    return async (dispatch: Dispatch): Promise<ProductWithPresentations[] | undefined> => {
        dispatch(checkingProducts());

        try {
            const products = await searchProductsWithPresentationsRequest(term, category);
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
║ 🚀 getProductStats                                                     ║
║ ⚙️  Proceso:                                                            ║
║   1. GET /product/get-product-stats                                    ║
║   2. Guarda el resultado en store con setStats                         ║
║ 📤 Salida: ProductStats o undefined en caso de error                   ║
╚══════════════════════════════════════════════════════════════════════╝*/
export const getProductStats = () => {

    return async (dispatch: Dispatch): Promise<ProductStats | undefined> => {
        dispatch(checkingStats());

        try {
            const stats = await getProductStatsRequest();
            dispatch(setStats(stats));
            return stats;

        } catch (error: unknown) {
            dispatch(setStatsError("No se pudo obtener los datos de productos"));
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
            const previous = getState().product.currentProduct;

            const fullBody = {
                ...previous,
                ...body,
                updated_at: new Date().toISOString(),
                created_at: previous?.created_at ?? body.created_at ?? new Date().toISOString(),
                presentations: previous?.presentations ?? [],
            };

            await editProductRequest(fullBody);

            const updated: Product = { ...(previous as Product), ...fullBody };
            dispatch(setCurrentProduct(updated));
            return updated;

        } catch (error: unknown) {
            dispatch(setCurrentProductError("Error al actualizar el producto"));
            handleError(error);
            throw error; // 🆕 mismo motivo que en createProduct
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
