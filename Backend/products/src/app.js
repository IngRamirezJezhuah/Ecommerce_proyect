import bodyParser from "body-parser";
import express from "express";
import usersRoutes from "./routes/productRoutes.js";
import swaggerSpec from "./api-docs.js";
import swaggerUI from "swagger-ui-express";

const app = express();

app.use(bodyParser.json());

app.use('/api/products', usersRoutes);
app.use('/api-docs', swaggerUI.serve,
    swaggerUI.setup(swaggerSpec));


export default app;