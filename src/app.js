import express from 'express';
import connectDB from './config/db.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import tiendaRoutes from './routes/StoreRoutes.js';
import productoRoutes from './routes/productoRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/store", tiendaRoutes);

app.use('/api/productos', productoRoutes);


app.listen(PORT, async () => {
    await connectDB();
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});