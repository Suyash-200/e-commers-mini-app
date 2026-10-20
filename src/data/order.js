import api from "./api";

export const getAllOrders = async () => {
    const response = await api.get("/orders");

    return response.data;
};

export const updateOrderStatus = async (orderId, status) => {
    const response = await api.patch(
        `/orders/${orderId}/status`,
        {
            status
        }
    );

    return response.data;
};