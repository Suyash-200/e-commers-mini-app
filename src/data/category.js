import api from "./api";

export const getAllCategory = async () => {
    try {
        const res = await api.get("/categories");
        return res.data;
    } catch (error) {
        console.error("Category not fetched", error);
        throw error;
    }
};

export const getSingleCategory = async (id) => {
    try {
        const res = await api.get(`/categories/${id}`);
        return res.data;
    } catch (error) {
        console.error("Category not fetched", error);
        throw error;
    }
};

export const addCategory = async (formData) => {
    try {
        const newCategory = new FormData();
        const token = localStorage.getItem("token");

        newCategory.append("name", formData.name);
        newCategory.append("description", formData.description);

        if (formData.image) {
            newCategory.append("image", formData.image);
        }

        const res = await api.post(
            "/categories",
            newCategory,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return res.data;
    } catch (error) {
        console.error("Category not added", error);
        throw error;
    }
};

export const updateCategory = async (id, formData) => {
    try {
        const updatedCategory = new FormData();
        const token = localStorage.getItem("token");

        updatedCategory.append("name", formData.name);
        updatedCategory.append("description", formData.description);

        if (formData.image instanceof File) {
            updatedCategory.append("image", formData.image);
        }

        const res = await api.put(
            `/categories/${id}`,
            updatedCategory,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return res.data;
    } catch (error) {
        console.error("Category not updated", error);
        throw error;
    }
};

export const deleteCategory = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const res = await api.delete(
            `/categories/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return res.data;
    } catch (error) {
        console.error("Category not deleted", error);
        throw error;
    }
};