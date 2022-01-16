import express from "express";
import cors from "cors";
import { urlencoded } from "body-parser";

export const app = express();

// Middlewares
app.use(cors());
app.use(urlencoded({ extended: false }));

export default app;
