import bodyParser from "body-parser";
import express from "express";
import usersRoutes from "./routes/productRoutes.js";

const app = express();

// Middleware para parsear JSON
app.use(express.json({ limit: '15mb' }));  // Establecer el límite en 10 MB

// Rutas de productos
app.use("/api/products", usersRoutes);

export default app;
