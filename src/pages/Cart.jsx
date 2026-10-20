import { useEffect, useState } from "react";
import {
    getCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    placeOrder
} from "../data/cart";

const Cart = () => {
    const [cart, setCart] = useState({ items: [] });
    const [loading, setLoading] = useState(true);
    const [showAddressForm, setShowAddressForm] = useState(false);

    const [shippingAddress, setShippingAddress] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });

    const fetchCart = async () => {
        try {
            const data = await getCart();
            setCart(data);
        } catch (error) {
            console.error("Error fetching cart:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    const handleAddressChange = (e) => {
        const { name, value } = e.target;

        setShippingAddress((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleQuantityChange = async (productId, quantity) => {
        if (quantity < 1) {
            return;
        }

        try {
            const data = await updateCartItem(productId, quantity);

            setCart(data.cart);

            window.dispatchEvent(new Event("cartUpdated"));
        } catch (error) {
            console.error("Error updating cart:", error);
        }
    };

    const handleRemove = async (productId) => {
        try {
            const data = await removeFromCart(productId);

            setCart(data.cart);

            window.dispatchEvent(new Event("cartUpdated"));
        } catch (error) {
            console.error("Error removing product:", error);
        }
    };

    const handleClearCart = async () => {
        try {
            const data = await clearCart();

            setCart(data.cart);

            window.dispatchEvent(new Event("cartUpdated"));
        } catch (error) {
            console.error("Error clearing cart:", error);
        }
    };

    const handleCheckout = () => {
        setShowAddressForm(true);
    };

    const handlePlaceOrder = async () => {
        const {
            name,
            phone,
            address,
            city,
            state,
            pincode
        } = shippingAddress;

        if (
            !name.trim() ||
            !phone.trim() ||
            !address.trim() ||
            !city.trim() ||
            !state.trim() ||
            !pincode.trim()
        ) {
            alert("Please fill all required shipping address fields.");
            return;
        }

        try {
            const data = await placeOrder(shippingAddress);

            console.log("Order placed:", data);

            setCart({ items: [] });

            window.dispatchEvent(new Event("cartUpdated"));

            setShowAddressForm(false);

        } catch (error) {
            console.error("Error placing order:", error);
        }
    };

    const getTotal = () => {
        return cart.items.reduce((total, item) => {
            return total + item.product.price * item.quantity;
        }, 0);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-500">Loading cart...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Shopping Cart
                        </h1>

                        <p className="text-gray-500 mt-2">
                            {cart.items.length}{" "}
                            {cart.items.length === 1 ? "item" : "items"} in
                            your cart
                        </p>
                    </div>

                    {cart.items.length > 0 && (
                        <button
                            onClick={handleClearCart}
                            className="px-4 py-2 text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition"
                        >
                            Clear Cart
                        </button>
                    )}
                </div>

                {/* Empty Cart */}
                {cart.items.length === 0 ? (
                    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                        <div className="text-5xl mb-4">
                            🛒
                        </div>

                        <h2 className="text-xl font-semibold text-gray-800">
                            Your cart is empty
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Add some products to your cart.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">

                            {cart.items.map((item) => {
                                const product = item.product;

                                return (
                                    <div
                                        key={product._id}
                                        className="bg-white rounded-xl border border-gray-200 p-5"
                                    >
                                        <div className="flex gap-5">

                                            {/* Product Image */}
                                            <div className="w-28 h-28 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                                                {product.image ? (
                                                    <img
                                                        src={`http://localhost:3000/uploads/${product.image}`}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        No Image
                                                    </div>
                                                )}
                                            </div>

                                            {/* Product Details */}
                                            <div className="flex-1">

                                                <div className="flex justify-between gap-4">
                                                    <div>
                                                        <h2 className="text-lg font-semibold text-gray-900">
                                                            {product.name}
                                                        </h2>

                                                        <p className="text-gray-500 mt-1">
                                                            ₹{product.price}
                                                        </p>
                                                    </div>

                                                    <button
                                                        onClick={() =>
                                                            handleRemove(
                                                                product._id
                                                            )
                                                        }
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        Remove
                                                    </button>
                                                </div>

                                                {/* Quantity */}
                                                <div className="flex items-center justify-between mt-5">

                                                    <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">

                                                        <button
                                                            onClick={() =>
                                                                handleQuantityChange(
                                                                    product._id,
                                                                    item.quantity - 1
                                                                )
                                                            }
                                                            disabled={
                                                                item.quantity === 1
                                                            }
                                                            className="px-4 py-2 hover:bg-gray-100 disabled:opacity-40"
                                                        >
                                                            −
                                                        </button>

                                                        <span className="px-5 py-2 border-x border-gray-300">
                                                            {item.quantity}
                                                        </span>

                                                        <button
                                                            onClick={() =>
                                                                handleQuantityChange(
                                                                    product._id,
                                                                    item.quantity + 1
                                                                )
                                                            }
                                                            className="px-4 py-2 hover:bg-gray-100"
                                                        >
                                                            +
                                                        </button>

                                                    </div>

                                                    <p className="font-semibold text-gray-900">
                                                        ₹
                                                        {product.price *
                                                            item.quantity}
                                                    </p>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Order Summary */}
                        <div>
                            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">

                                <h2 className="text-xl font-semibold text-gray-900">
                                    Order Summary
                                </h2>

                                <div className="flex justify-between mt-6 text-gray-600">
                                    <span>Subtotal</span>

                                    <span>
                                        ₹{getTotal()}
                                    </span>
                                </div>

                                <div className="flex justify-between mt-3 text-gray-600">
                                    <span>Shipping</span>

                                    <span>
                                        Free
                                    </span>
                                </div>

                                <div className="border-t border-gray-200 mt-5 pt-5 flex justify-between">
                                    <span className="text-lg font-semibold">
                                        Total
                                    </span>

                                    <span className="text-xl font-bold">
                                        ₹{getTotal()}
                                    </span>
                                </div>

                                <button
                                    onClick={handleCheckout}
                                    className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
                                >
                                    Proceed to Checkout
                                </button>

                            </div>
                        </div>

                    </div>
                )}
            </div>

            {/* Shipping Address Modal */}
            {showAddressForm && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

                    <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl h-4/5 overflow-auto">

                        {/* Modal Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">

                            <h2 className="text-xl font-semibold text-gray-900">
                                Shipping Address
                            </h2>

                            <button
                                onClick={() => setShowAddressForm(false)}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                ×
                            </button>

                        </div>

                        {/* Form */}
                        <div className="p-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                {/* Name */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Name <span className="text-red-500">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="name"
                                        value={shippingAddress.name}
                                        onChange={handleAddressChange}
                                        placeholder="Enter your name"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500"
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Phone <span className="text-red-500">*</span>
                                    </label>

                                    <input
                                        type="tel"
                                        name="phone"
                                        value={shippingAddress.phone}
                                        onChange={handleAddressChange}
                                        placeholder="Enter phone number"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500"
                                    />
                                </div>

                                {/* Address */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Address <span className="text-red-500">*</span>
                                    </label>

                                    <textarea
                                        name="address"
                                        value={shippingAddress.address}
                                        onChange={handleAddressChange}
                                        placeholder="Enter your complete address"
                                        rows="3"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500 resize-none"
                                    />
                                </div>

                                {/* City */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        City <span className="text-red-500">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="city"
                                        value={shippingAddress.city}
                                        onChange={handleAddressChange}
                                        placeholder="Enter city"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500"
                                    />
                                </div>

                                {/* State */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        State <span className="text-red-500">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="state"
                                        value={shippingAddress.state}
                                        onChange={handleAddressChange}
                                        placeholder="Enter state"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500"
                                    />
                                </div>

                                {/* Pincode */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Pincode <span className="text-red-500">*</span>
                                    </label>

                                    <input
                                        type="text"
                                        name="pincode"
                                        value={shippingAddress.pincode}
                                        onChange={handleAddressChange}
                                        placeholder="Enter pincode"
                                        maxLength="6"
                                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 outline-none focus:border-blue-500"
                                    />
                                </div>

                            </div>

                        </div>

                        {/* Modal Footer */}
                        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">

                            <button
                                onClick={() => setShowAddressForm(false)}
                                className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handlePlaceOrder}
                                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                            >
                                Place Order
                            </button>

                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;