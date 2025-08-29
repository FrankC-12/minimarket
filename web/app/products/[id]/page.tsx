"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProductById } from "../../lib/api";
import { Product } from "../../../../shared/types";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (typeof id === "string") getProductById(id).then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <p>Cargando producto...</p>;

  return (
    <div style={{ padding: 16 }}>
      <img src={product.image} alt={product.name} width={400} height={400} />
      <h1 style={{ fontSize: 20, fontWeight: 600 }}>{product.name}</h1>
      <p style={{ fontSize: 18 }}>${product.price}</p>
      <span style={{
        background: product.isAvailable ? "green" : "gray",
        color: "white",
        padding: "2px 6px",
        borderRadius: 4,
        fontSize: 12
      }}>
        {product.isAvailable ? "En stock" : "Sin stock"}
      </span>
      <button style={{ marginTop: 16, padding: "8px 16px", background: "blue", color: "white", borderRadius: 6 }}>
        Agregar a favoritos
      </button>
    </div>
  );
}
