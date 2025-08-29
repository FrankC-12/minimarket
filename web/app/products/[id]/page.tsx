"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getProductById } from "../../lib/api";
import { Product } from "../../../../shared/types";
import { ArrowLeftIcon } from "@heroicons/react/24/solid"; // necesitas instalar heroicons

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (typeof id === "string") getProductById(id).then(res => setProduct(res.data));
  }, [id]);

  if (!product) return <p className="text-center text-gray-500 mt-8">Cargando producto...</p>;

  return (
    <div className="p-4 sm:p-8 max-w-4xl mx-auto relative">
      {/* Botón Volver */}
      <button
        onClick={() => router.push("/products")}
        title="Volver a productos"
        className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center bg-gray-200 rounded-full shadow hover:bg-gray-300 transition"
      >
        <ArrowLeftIcon className="w-5 h-5 text-gray-700" />
      </button>

      <div className="flex flex-col items-center mt-10">
        <img
          src={product.image}
          alt={product.name}
          className="w-full max-w-md rounded shadow mb-6"
        />
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-xl font-medium mb-2">${product.price}</p>
        <span
          className={`text-sm px-3 py-1 rounded ${
            product.isAvailable ? "bg-green-500" : "bg-gray-400"
          } text-white`}
        >
          {product.isAvailable ? "En stock" : "Sin stock"}
        </span>

        <button
          className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Agregar a favoritos
        </button>
      </div>
    </div>
  );
}
