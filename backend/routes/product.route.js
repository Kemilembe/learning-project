import express from "express";

import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

// GET all products
router.get("/", getProducts);

// POST create new product
router.post("/", createProduct );

// PUT update product by ID
router.put("/:id", updateProduct );

// DELETE product by ID
router.delete("/:id", deleteProduct);

export default router;
