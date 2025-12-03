import axios from "axios";

const baseUrl = axios.create({
    baseURL: 'http://localhost:3000/product-variant',
    timeout: 5000,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true,
});

export const getProductVariantsByIdRequest = async ({product_id} : {product_id: string}) => {
    const response = await baseUrl.get(`/get-product-variant-by-product-id/${product_id}`);
    return response.data;
}