import api from "./api";

export const addToCart = async (productId, quantity = 1) => {
    const token = localStorage.getItem("token");

    const res = await api.post(
        "/cart",
        {
            productId,
            quantity,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return res.data;
};

export const getCart = async () => {
    const token = localStorage.getItem("token");

    const res = await api.get("/cart", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};

export const updateCartItem = async (productId, quantity) => {
    const token = localStorage.getItem("token");

    const res = await api.put(
        `/cart/${productId}`,
        {
            quantity,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return res.data;
};

export const removeFromCart = async (productId) => {
    const token = localStorage.getItem("token");

    const res = await api.delete(`/cart/${productId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};

export const clearCart = async () => {
    const token = localStorage.getItem("token");

    const res = await api.delete("/cart", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return res.data;
};

export const placeOrder = async (shippingAddress) => {
    try {
        const token = localStorage.getItem("token");

        const res = await api.post(
            "/orders",
            {shippingAddress},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return res.data;

    } catch (error) {
        console.error(
            "Place order error:",
            error.response?.data?.message || error.message
        );

        throw error;
    }
};