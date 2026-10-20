import api from "./api";

// Get all products
export const getAllProduct = async ({
    search = "",
    category = "",
    minPrice = "",
    maxPrice = "",
    sort = "",
    page = 1,
    limit = 6
} = {}) => {
    try {
        const res = await api.get("/products", {
            params: {
                search,
                category,
                minPrice,
                maxPrice,
                sort,
                page,
                limit
            }
        });

        return res.data;
    } catch (error) {
        console.error("Product not fetched", error);
        throw error;
    }
};

// Get single product
export const getSingleProduct = async (id) => {
    try {
        const res = await api.get(`/products/${id}`);
        return res.data;
    } catch (error) {
        console.error("Product not fetched", error);
        throw error;
    }
};

// Add product
export const addProduct = async (formData) => {
    try {
        const newProduct = new FormData();
        const token = localStorage.getItem("token");

        newProduct.append("name", formData.name);
        newProduct.append("price", formData.price);
        newProduct.append("description", formData.description);
        newProduct.append("category", formData.category);

        if (formData.image) {
            newProduct.append("image", formData.image);
        }

        const res = await api.post(
            "/products",
            newProduct,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return res.data;
    } catch (error) {
        console.error("Product not added", error);
        throw error;
    }
};

// Update product
export const updateProduct = async (id, formData) => {
    try {
        const updatedProduct = new FormData();
        const token = localStorage.getItem("token");

        updatedProduct.append("name", formData.name);
        updatedProduct.append("price", formData.price);
        updatedProduct.append("description", formData.description);
        updatedProduct.append("categoryType", formData.categoryType);

        if (formData.image instanceof File) {
            updatedProduct.append("image", formData.image);
        }

        const res = await api.put(
            `/products/${id}`,
            updatedProduct,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return res.data;
    } catch (error) {
        console.error("Product not updated", error);
        throw error;
    }
};

// Delete product
export const deleteProduct = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const res = await api.delete(
            `/products/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return res.data;
    } catch (error) {
        console.error("Product not deleted", error);
        throw error;
    }
};