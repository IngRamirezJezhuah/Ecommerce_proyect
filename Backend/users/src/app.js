import bodyParser from "body-parser";
import express from "express";
import usersRoutes from "./routes/usersRoutes.js";
import { userEvents } from "./services/rabbitServicesListener.js"

const app = express();

app.use(bodyParser.json());

app.use('/api/users', usersRoutes);

userEvents().catch((err) => {
    console.error(`Error iniciando el consumidor de eventos:`, err);
})

export default app;