import express from 'express';
import path from 'path';
import dotnev from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import orderRoutes from './routes/orderRoutes.js';


dotnev.config();

// solve cors error
import cors from 'cors';
const corsOptions = {
  origin: "https://mern-ekart.vercel.app/",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const port = process.env.PORT || 5000;  
connectDB();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json()); // for parsing application/json
app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded


app.get("/api/config/paypal", (req, res) => {
    res.send({clientId: process.env.PAYPAL_CLIENT_ID});
});

app.use('/api/users', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/products', productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);

// const __dirname = path.resolve();
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);
