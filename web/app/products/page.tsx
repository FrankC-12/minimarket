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

  useEffect(() => {
    fetchProducts();
    fetchTopProducts();
  }, [fetchProducts]);

  const fetchTopProducts = async () => {
    const res = await getTopCheapestProducts(3);
    setTopProducts(res.data);
  };

  return (
    <div style={{ padding: 16 }}>
      {/* Sección Top 3 */}
      <h2>Top 3 productos más baratos</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16, marginBottom: 32 }}>
        {topProducts.map(p => <ProductCard key={p.id} product={p} />)}
      </div>

      {/* Filtros */}
      <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <label htmlFor="sort-select">Ordenar por:</label>
        <select id="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
          <option value="price">Precio</option>
          <option value="name">Nombre</option>
        </select>
        <label htmlFor="order-select">Orden:</label>
        <select id="order-select" value={order} onChange={e => setOrder(e.target.value)}>
          <option value="asc">Ascendente</option>
          <option value="desc">Descendente</option>
        </select>
        <label>
          <input
            type="checkbox"
            checked={available}
            onChange={e => setAvailable(e.target.checked)}
          /> Solo en stock
        </label>
      </div>

      {/* Productos */}
      {loading ? <p>Cargando productos...</p> : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 16 }}>
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}

      {/* Paginación */}
      <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Anterior</button>
        <span>Página {page}</span>
        <button onClick={() => setPage(page + 1)} disabled={products.length < limit}>Siguiente</button>
      </div>
    </div>
  );
}
