import express from "express";
import cors from "cors";
import morgan from "morgan";
import productsRouter from "./products.router";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/products", productsRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});