import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';  // Import this to work with ES modules
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js'; // Import your product routes

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Create __dirname manually for ES modules
const __filename = fileURLToPath(import.meta.url);  // Get current file path
const __dirname = path.dirname(__filename);         // Get current directory path

app.use(express.json()); // Allow to accept JSON data

// Use product routes for /api/products
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
  // Updated path for serving static files
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
  // Serve index.html for all other routes
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log("Server started at http://localhost:" + PORT);
});
