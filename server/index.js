import express from 'express';
import dotnev from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';


dotnev.config();

const port = process.env.PORT || 5000;  
connectDB();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json()); // for parsing application/json
app.use(express.urlencoded({extended: true})); // for parsing application/x-www-form-urlencoded



app.use('/api/users', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/products', productRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);
