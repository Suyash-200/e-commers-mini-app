import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCart } from "../data/cart";
import { FaCartShopping } from "react-icons/fa6";

const Navbar = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const [cartCount, setCartCount] = useState(0);

    let username = "";
    let role = "";

    if (token) {
        try {
            const payload = JSON.parse(atob(token.split(".")[1]));
            username = payload.username;
            role = payload.role
        } catch (error) {
            localStorage.removeItem("token");
        }
    }

    const fetchCartCount = async () => {
        if (!token) {
            setCartCount(0);
            return;
        }

        try {
            const data = await getCart();

            const count = data?.items?.reduce(
                (total, item) => total + item.quantity,
                0
            ) || 0;

            setCartCount(count);
        } catch (error) {
            console.error("Error fetching cart:", error);
            setCartCount(0);
        }
    };

    useEffect(() => {
        fetchCartCount();

        const handleCartUpdate = () => {
            fetchCartCount();
        };

        window.addEventListener("cartUpdated", handleCartUpdate);

        return () => {
            window.removeEventListener("cartUpdated", handleCartUpdate);
        };
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="h-16 flex items-center justify-between">

                    {/* Logo */}
                    <Link
                        to="/"
                        className="text-2xl font-bold text-gray-900"
                    >
                        Mini<span className="text-blue-600">Store</span>
                    </Link>

                    {/* Navigation */}
                    <div className="hidden md:flex items-center gap-8">

                        <Link
                            to="/"
                            className="text-gray-600 hover:text-blue-600 font-medium transition"
                        >
                            Products
                        </Link>

                        <Link
                            to="/categories"
                            className="text-gray-600 hover:text-blue-600 font-medium transition"
                        >
                            Categories
                        </Link>

                        <Link
                            to="/add-product"
                            className="text-gray-600 hover:text-blue-600 font-medium transition"
                        >
                            Add Product
                        </Link>
                        <Link
    to="/orders"
    className="text-gray-600 hover:text-blue-600 font-medium transition"
>
    Orders
</Link>
                    </div>

                    {/* Right Side */}
                    <div className="flex items-center gap-4">

                        {/* User */}
                        {token ? (
                            <div className="flex items-center gap-3">

                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-9 h-9 rounded-full bg-blue-100
                                                   flex items-center justify-center
                                                   text-blue-600 font-semibold"
                                    >
                                        {username?.charAt(0).toUpperCase()}
                                    </div>

                                    <span className="text-gray-700 font-medium">
                                        {username}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        {role}
                                    </span>
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 rounded-lg
                                               border border-gray-300
                                               text-gray-700 font-medium
                                               hover:bg-gray-100 transition"
                                >
                                    Logout
                                </button>

                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="px-4 py-2 rounded-lg
                                           bg-blue-600 text-white font-medium
                                           hover:bg-blue-700 transition"
                            >
                                Login
                            </Link>
                        )}

                        {/* Cart */}
                        <button
                            onClick={() => navigate("/cart")}
                            className="relative flex items-center gap-2 px-4 py-2 rounded-lg
                                       bg-blue-600 text-white font-medium
                                       hover:bg-blue-700 transition"
                        >
                            <span className="text-lg">
                                <FaCartShopping />
                            </span>

                            <span>
                                Cart
                            </span>

                            {/* Cart Count */}
                            {cartCount > 0 && (
                                <span
                                    className="absolute -top-2 -right-2
                                               min-w-5 h-5 px-1
                                               bg-red-500 text-white
                                               text-xs font-bold
                                               rounded-full
                                               flex items-center justify-center"
                                >
                                    {cartCount}
                                </span>
                            )}
                        </button>

                    </div>

                </div>

            </div>
        </nav>
    );
};

export default Navbar;