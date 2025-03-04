// import express from "express";
// import dotenv from "dotenv";
// import cors from 'cors';


// import { connectDB } from "./config/db.js";

// import productRoutes from "./routes/product.route.js";

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5001;

// const __dirname = path.resolve();

// app.use(express.json()); // allows us to accept JSON data in the req.body

// app.use("/api/products", productRoutes);

// if (process.env.NODE_ENV === "production") {
// 	app.use(express.static(path.join(__dirname, "/frontend/dist")));
// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// 	});
// }

// app.listen(PORT, () => {
// 	connectDB();
// 	console.log("Server started at http://localhost:" + PORT);
// });




import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// CORS Configuration
const allowedOrigins = [
  'https://product-add-tau.vercel.app',  // Old frontend URL
  'https://product-q6rmhenil-sithums-projects-1863f09e.vercel.app',  // New frontend URL
];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {  // Allows requests with no origin (like from Postman)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies, authorization headers, etc.
}));

// Middleware to parse incoming JSON
app.use(express.json());

// API Routes
app.use('/api/products', productRoutes);

// Start Server
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
