// import { create } from "zustand";

// export const useProductStore = create((set) => ({
// 	products: [],
// 	setProducts: (products) => set({ products }),
// 	createProduct: async (newProduct) => {
// 		if (!newProduct.name || !newProduct.image || !newProduct.price) {
// 			return { success: false, message: "Please fill in all fields." };
// 		}
// 		const res = await fetch("/api/products", {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify(newProduct),
// 		});
// 		const data = await res.json();
// 		set((state) => ({ products: [...state.products, data.data] }));
// 		return { success: true, message: "Product created successfully" };
// 	},
// 	fetchProducts: async () => {
// 		const res = await fetch("/api/products");
// 		const data = await res.json();
// 		set({ products: data.data });
// 	},
// 	deleteProduct: async (pid) => {
// 		const res = await fetch(`/api/products/${pid}`, {
// 			method: "DELETE",
// 		});
// 		const data = await res.json();
// 		if (!data.success) return { success: false, message: data.message };

// 		// update the ui immediately, without needing a refresh
// 		set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
// 		return { success: true, message: data.message };
// 	},
// 	updateProduct: async (pid, updatedProduct) => {
// 		const res = await fetch(`/api/products/${pid}`, {
// 			method: "PUT",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify(updatedProduct),
// 		});
// 		const data = await res.json();
// 		if (!data.success) return { success: false, message: data.message };

// 		// update the ui immediately, without needing a refresh
// 		set((state) => ({
// 			products: state.products.map((product) => (product._id === pid ? data.data : product)),
// 		}));

// 		return { success: true, message: data.message };
// 	},
// }));



import { create } from "zustand";

const BASE_URL = "https://aryalabs-technical-tasks.onrender.com"; // ✅ Use Render backend URL

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  // Creating a product, now using BASE_URL
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }

    // API call to create product using the correct backend URL
    const res = await fetch(`${BASE_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    const data = await res.json();

    if (res.ok) {
      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: "Product created successfully" };
    } else {
      return { success: false, message: data.message || "Error creating product" };
    }
  },

  fetchProducts: async () => {
    const res = await fetch(`${BASE_URL}/api/products`);
    const data = await res.json();
    set({ products: data.data });
  },

  deleteProduct: async (pid) => {
    const res = await fetch(`${BASE_URL}/api/products/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (!data.success) return { success: false, message: data.message };

    // update the UI immediately without needing a refresh
    set((state) => ({ products: state.products.filter((product) => product._id !== pid) }));
    return { success: true, message: data.message };
  },

  updateProduct: async (pid, updatedProduct) => {
    const res = await fetch(`${BASE_URL}/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });

    const data = await res.json();

    if (!data.success) return { success: false, message: data.message };

    // update the UI immediately without needing a refresh
    set((state) => ({
      products: state.products.map((product) => (product._id === pid ? data.data : product)),
    }));

    return { success: true, message: data.message };
  },
}));
