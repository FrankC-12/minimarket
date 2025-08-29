import Image from "next/image";
import Link from "next/link";
import { Product } from "../../../shared/types";

interface Props {
  product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => (
  <Link href={`/products/${product.id}`}>
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: 8,
        padding: 8,
        cursor: "pointer",
        width: 300, // ancho fijo
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", minHeight: 200 }}>
        <Image
          src={product.image}
          alt={product.name}
          width={180}
          height={180}
          style={{ objectFit: "contain" }}
        />
      </div>
      <div style={{ textAlign: "center", marginTop: 8 }}>
        <h2 style={{ fontWeight: 600, fontSize: 16, margin: "8px 0 4px" }}>{product.name}</h2>
        <p style={{ fontSize: 14, margin: 0 }}>${product.price}</p>
        <span
          style={{
            display: "inline-block",
            marginTop: 4,
            background: product.isAvailable ? "green" : "gray",
            color: "white",
            padding: "2px 6px",
            borderRadius: 4,
            fontSize: 12,
          }}
        >
          {product.isAvailable ? "En stock" : "Sin stock"}
        </span>
      </div>
    </div>
  </Link>
);

export default ProductCard;
