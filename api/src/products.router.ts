import { Router } from "express";
import { Product } from "./types";
import productsData from "./data/products.json";

const router = Router();
const products: Product[] = productsData as Product[];

router.get("/", (req, res) => {
  let result = [...products];

  // Filtros
  const { search, sort, order, page = "1", limit = "10", available } = req.query;

  if (search) {
    result = result.filter(p =>
      p.name.toLowerCase().includes((search as string).toLowerCase())
    );
  }

  if (available) {
    const isAvailable = available === "true";
    result = result.filter(p => p.isAvailable === isAvailable);
  }

  if (sort) {
    const orderFactor = order === "desc" ? -1 : 1;
    result.sort((a, b) => {
      if (sort === "price") return (a.price - b.price) * orderFactor;
      if (sort === "name") return a.name.localeCompare(b.name) * orderFactor;
      return 0;
    });
  }

  const pageNum = parseInt(page as string, 10);
  const limitNum = parseInt(limit as string, 10);
  const start = (pageNum - 1) * limitNum;
  const end = start + limitNum;

  res.json(result.slice(start, end));
});

// GET /api/products/top-cheap?top=3
router.get("/top-cheap", (req, res) => {
  // 1. Leer el query param `top`, por defecto 3
  const topParam = req.query.top ? parseInt(req.query.top as string, 10) : 3;

  // 2. Función para obtener los N productos más baratos disponibles
  const getTopCheapestAvailable = (products: Product[], top = 3): Product[] => {
    return products
      .filter(p => p.isAvailable)        // Filtra productos en stock
      .sort((a, b) => a.price - b.price) // Ordena por precio ascendente
      .slice(0, top);                     // Devuelve los N más baratos
  };

  // 3. Aplicar función sobre el listado de productos
  const topProducts = getTopCheapestAvailable(products, topParam);

  // 4. Devolver JSON
  res.json(topProducts);
});

router.get("/:id", (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
});




export default router;
