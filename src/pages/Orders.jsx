import { useEffect, useState } from "react";
import { getAllOrders, updateOrderStatus } from "../data/order";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const statusOptions = [
        "pending",
        "confirmed",
        "shipped",
        "delivered",
        "cancelled"
    ];

    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getAllOrders();

                setOrders(data.orders || []);

            } catch (error) {
                console.error("Error fetching orders:", error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load orders"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const getStatusClass = (status) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-700";

            case "confirmed":
                return "bg-blue-100 text-blue-700";

            case "shipped":
                return "bg-purple-100 text-purple-700";

            case "delivered":
                return "bg-green-100 text-green-700";

            case "cancelled":
                return "bg-red-100 text-red-700";

            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    const handleStatusChange = async (orderId, status) => {
        try {
            const data = await updateOrderStatus(orderId, status);

            setOrders((prevOrders) =>
                prevOrders.map((order) =>
                    order._id === orderId
                        ? data.order
                        : order
                )
            );

            if (selectedOrder?._id === orderId) {
                setSelectedOrder(data.order);
            }

        } catch (error) {
            console.error("Error updating order status:", error);

            alert(
                error.response?.data?.message ||
                "Failed to update order status"
            );
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50 p-6">

            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="flex items-center justify-between mb-6">

                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Orders
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Manage customer orders and order status
                        </p>
                    </div>

                    <div className="px-4 py-2 bg-white border border-gray-200
                                    rounded-lg text-sm text-gray-600">
                        Total Orders: {orders.length}
                    </div>

                </div>
                {loading && (
                    <div className="bg-white rounded-xl border border-gray-200
                                    p-8 text-center text-gray-500">
                        Loading orders...
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border border-red-200
                                    rounded-xl p-4 text-red-600">
                        {error}
                    </div>
                )}
                {/* Orders Table */}
                <div className="bg-white rounded-xl border border-gray-200
                                shadow-sm overflow-hidden">

                    <div className="overflow-x-auto">

                        <table className="w-full text-sm">

                            <thead className="bg-gray-50 border-b border-gray-200">

                                <tr>

                                    <th className="px-6 py-4 text-left
                                                   font-semibold text-gray-700">
                                        Order ID
                                    </th>

                                    <th className="px-6 py-4 text-left
                                                   font-semibold text-gray-700">
                                        Customer
                                    </th>

                                    <th className="px-6 py-4 text-left
                                                   font-semibold text-gray-700">
                                        Amount
                                    </th>

                                    <th className="px-6 py-4 text-left
                                                   font-semibold text-gray-700">
                                        Status
                                    </th>

                                    <th className="px-6 py-4 text-left
                                                   font-semibold text-gray-700">
                                        Date
                                    </th>

                                    <th className="px-6 py-4 text-left
                                                   font-semibold text-gray-700">
                                        Action
                                    </th>

                                </tr>

                            </thead>

                            <tbody className="divide-y divide-gray-100">

                                {orders.map((order) => (

                                    <tr
                                        key={order._id}
                                        className="hover:bg-gray-50"
                                    >

                                        <td className="px-6 py-4">
                                            <span className="font-medium
                                                             text-gray-900">
                                                #{order._id.slice(-6)}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4">

                                            <div>
                                                <p className="font-medium
                                                              text-gray-900">
                                                    {order.user.username}
                                                </p>

                                                <p className="text-xs
                                                              text-gray-500">
                                                    {order.user.email}
                                                </p>
                                            </div>

                                        </td>

                                        <td className="px-6 py-4
                                                       font-medium text-gray-900">
                                            ₹{order.totalAmount.toLocaleString()}
                                        </td>

<td className="px-6 py-4">

    <select
        value={order.status}
        onChange={(e) =>
            handleStatusChange(
                order._id,
                e.target.value
            )
        }
        className={`px-3 py-2 rounded-lg text-sm
                    font-medium capitalize
                    border border-gray-200
                    outline-none cursor-pointer
                    ${getStatusClass(order.status)}`}
    >
        {statusOptions.map((status) => (
            <option
                key={status}
                value={status}
            >
                {status}
            </option>
        ))}
    </select>

</td>

                                        <td className="px-6 py-4 text-gray-600">
                                            {order.createdAt}
                                        </td>

                                        <td className="px-6 py-4">

                                            <button
                                                onClick={() =>
                                                    setSelectedOrder(order)
                                                }
                                                className="px-4 py-2 rounded-lg
                                                           bg-blue-600
                                                           text-white text-sm
                                                           font-medium
                                                           hover:bg-blue-700
                                                           transition"
                                            >
                                                View
                                            </button>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

            {/* Order Details Modal */}
            {selectedOrder && (

                <div className="fixed inset-0 z-50 flex items-center
                                justify-center bg-black/40 px-4">

                    <div className="w-full max-w-2xl bg-white rounded-xl
                                    shadow-xl max-h-[90vh] overflow-y-auto">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between
                                        px-6 py-4 border-b border-gray-200">

                            <div>
                                <h2 className="text-lg font-bold text-gray-900">
                                    Order #{selectedOrder._id.slice(-6)}
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Order details
                                </p>
                            </div>

                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="text-gray-500 hover:text-gray-700
                                           text-xl"
                            >
                                ×
                            </button>

                        </div>

                        {/* Customer */}
                        <div className="p-6 border-b border-gray-200">

                            <h3 className="font-semibold text-gray-900 mb-3">
                                Customer Information
                            </h3>

                            <div className="grid grid-cols-2 gap-4 text-sm">

                                <div>
                                    <p className="text-gray-500">
                                        Name
                                    </p>

                                    <p className="font-medium text-gray-900">
                                        {selectedOrder.shippingAddress.name}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-gray-500">
                                        Phone
                                    </p>

                                    <p className="font-medium text-gray-900">
                                        {selectedOrder.shippingAddress.phone}
                                    </p>
                                </div>

                                <div className="col-span-2">
                                    <p className="text-gray-500">
                                        Address
                                    </p>

                                    <p className="font-medium text-gray-900">
                                        {selectedOrder.shippingAddress.address},{" "}
                                        {selectedOrder.shippingAddress.city},{" "}
                                        {selectedOrder.shippingAddress.state} -{" "}
                                        {selectedOrder.shippingAddress.pincode}
                                    </p>
                                </div>

                            </div>

                        </div>

                        {/* Products */}
                        <div className="p-6 border-b border-gray-200">

                            <h3 className="font-semibold text-gray-900 mb-4">
                                Products
                            </h3>

                            <div className="space-y-3">

                                {selectedOrder.items.map((item, index) => (

                                    <div
                                        key={index}
                                        className="flex items-center
                                                   justify-between
                                                   p-3 rounded-lg
                                                   bg-gray-50"
                                    >

                                        <div>
                                            <p className="font-medium
                                                          text-gray-900">
                                                {item.product.name}
                                            </p>

                                            <p className="text-sm text-gray-500">
                                                Quantity: {item.quantity}
                                            </p>
                                        </div>

                                        <p className="font-semibold text-gray-900">
                                            ₹{(
                                                item.price * item.quantity
                                            ).toLocaleString()}
                                        </p>

                                    </div>

                                ))}

                            </div>

                        </div>

                        {/* Status */}
                        <div className="p-6">

                            <div className="flex items-center justify-between">

                           <div>
    <p className="text-gray-500 text-sm mb-2">
        Order Status
    </p>

    <select
        value={selectedOrder.status}
        onChange={(e) =>
            handleStatusChange(
                selectedOrder._id,
                e.target.value
            )
        }
        className={`px-3 py-2 rounded-lg text-sm
                    font-medium capitalize
                    border border-gray-200
                    outline-none cursor-pointer
                    ${getStatusClass(selectedOrder.status)}`}
    >
        {statusOptions.map((status) => (
            <option
                key={status}
                value={status}
            >
                {status}
            </option>
        ))}
    </select>
</div>

                                <div className="text-right">

                                    <p className="text-gray-500 text-sm">
                                        Total Amount
                                    </p>

                                    <p className="text-xl font-bold
                                                  text-gray-900">
                                        ₹{selectedOrder.totalAmount.toLocaleString()}
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
};

export default Orders;