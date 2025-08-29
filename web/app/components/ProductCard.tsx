import Link from "next/link";
import React from "react";
import { Product } from "../../../shared/types";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => (
  <Link href={`/products/${product.id}`}>
    <div style={{ border: "1px solid #ccc", borderRadius: 8, padding: 8, cursor: "pointer" }}>
      <img src={product.image} alt={product.name} width={200} height={200} />
      <h2 style={{ fontWeight: 600, fontSize: 16 }}>{product.name}</h2>
      <p style={{ fontSize: 14 }}>${product.price}</p>
      <span style={{
        background: product.isAvailable ? "green" : "gray",
        color: "white",
        padding: "2px 6px",
        borderRadius: 4,
        fontSize: 12
      }}>
        {product.isAvailable ? "En stock" : "Sin stock"}
      </span>
    </div>
  </Link>
);

export default ProductCard;
