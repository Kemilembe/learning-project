import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],

  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();

      if (res.ok) {
        // Add the new product to the existing state
        set((state) => ({ products: [...state.products, data.data] }));
        return { success: true, message: "Product created successfully" };
      } else {
        return { success: false, message: data.message || "Error creating product" };
      }
    } catch (error) {
      console.error("Error creating product:", error.message);
      return { success: false, message: "Error connecting to server" };
    }
  },

  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");

      if (!res.ok) {
        throw new Error("Failed to fetch products");
      }

      const data = await res.json();
      set({ products: data.data });
    } catch (error) {
      console.error("Error fetching products:", error.message);
      set({ products: [] }); // Optionally set an empty array if the fetch fails
    }
  },

  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        return { success: false, message: data.message || "Error deleting product" };
      }

      // Update UI immediately without refreshing
      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));

      return { success: true, message: "Product deleted successfully" };
    } catch (error) {
      console.error("Error deleting product:", error.message);
      return { success: false, message: "Error connecting to server" };
    }
  },

  updateProduct: async (pid, updatedProduct) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json", // Fixed the Content-Type header
        },
        body: JSON.stringify(updatedProduct),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        return { success: false, message: data.message || "Error updating product" };
      }

      // Update the product in the state
      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
      }));

      return { success: true, message: "Product updated successfully" }; // Added success message
    } catch (error) {
      console.error("Error updating product:", error.message);
      return { success: false, message: "Error connecting to server" };
    }
  },
}));
