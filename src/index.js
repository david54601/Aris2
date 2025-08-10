import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { sequelize } from "./config/db.js"; // Importamos sequelize directamente
import authRoutes from "./routes/routes.js";
import "./models/index.js";

// 🟢 Carga las variables de entorno antes de todo
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// 🧩 Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", authRoutes);

sequelize.authenticate()
  .then(() => {
    console.log("🟢 Conexión a MySQL exitosa");
    return sequelize.sync({ alter: true }); 
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("🔴 Error al conectar a MySQL:", err);
  });