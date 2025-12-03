import axios from "axios";


const baseUrl = axios.create({
  baseURL: 'http://localhost:3000/product',
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

export const getProductsRequest = async () => {
    const response = await baseUrl.get('/get-products');
    return response.data;
}