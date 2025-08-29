"use client";

import React, { useEffect, useState } from "react";
import { getProducts, getTopCheapestProducts } from "../lib/api";
import ProductCard from "../components/ProductCard";
import { Product } from "../../../shared/types";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Filtros y paginación
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("price");
  const [order, setOrder] = useState("asc");
  const [available, setAvailable] = useState(false);
  const [page, setPage] = useState(1);
  const [limit] = useState(6); // productos por página

  const fetchProducts = React.useCallback(async () => {
    setLoading(true);
    const params: { page: number; limit: number; sort: string; order: string; search?: string; available?: boolean } = { page, limit, sort, order };
    if (search) params.search = search;
    if (available) params.available = true;

    const res = await getProducts(params);
    setProducts(res.data);
    setLoading(false);
  }, [page, limit, sort, order, search, available]);

  const fetchTopProducts = async () => {
    const res = await getTopCheapestProducts(3);
    setTopProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
    fetchTopProducts();
  }, [fetchProducts]);

  return (
    <div className="p-4 sm:p-8">
      {/* Top 3 productos */}
      <h2 className="text-3xl font-bold text-center mb-6">Top 3 productos más baratos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
        {topProducts.map(p => <ProductCard key={p.id} product={p} />)}
      </div>

      {/* Filtros */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 flex-wrap">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex items-center gap-2">
          <label htmlFor="sort-select" className="font-medium">Ordenar por:</label>
          <select
            id="sort-select"
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="price">Precio</option>
            <option value="name">Nombre</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="order-select" className="font-medium">Orden:</label>
          <select
            id="order-select"
            value={order}
            onChange={e => setOrder(e.target.value)}
            className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
        </div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={available}
            onChange={e => setAvailable(e.target.checked)}
            className="accent-blue-500"
          />
          Solo en stock
        </label>
      </div>

      {/* Productos */}
      {loading ? (
        <p className="text-center text-gray-500">Cargando productos...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}

      {/* Paginación */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
        >
          Anterior
        </button>
        <span className="flex items-center font-medium">Página {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={products.length < limit}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
