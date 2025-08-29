import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api", // URL de tu backend
});

interface GetProductsParams {
  [key: string]: string | number | boolean | undefined;
}

export const getProducts = (params?: GetProductsParams) => api.get("/products", { params });
export const getProductById = (id: string) => api.get(`/products/${id}`);
export const getTopCheapestProducts = (top = 3) =>
  api.get(`/products/top-cheap?top=${top}`);
