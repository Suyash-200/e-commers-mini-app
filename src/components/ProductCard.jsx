
import { Link } from "react-router-dom";
import { deleteProduct } from "../data/products";
import { getAllProduct } from "../data/products";
import { useEffect, useState } from "react";
import { getAllCategory } from "../data/category";
import { BiSolidCartAdd } from "react-icons/bi";
import { addToCart } from "../data/cart";

const ProductCard = ({ product, setProducts }) => {

    const handleDeleteProduct = async () => {
        try {
            await deleteProduct(product._id);

            setProducts((prevProducts) =>
                prevProducts.filter((item) => item._id !== product._id)
            );
            getAllProduct()
        } catch (error) {
            console.error("Delete product error:", error);
        }
    };

    const [categories, setCategories] = useState([]);

    // Get categories from API
    useEffect(() => {
        getAllCategory()
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    const handleAddToCart = async () => {
        try {
            const data = await addToCart(product._id, 1);

            console.log("Cart updated:", data);

            window.dispatchEvent(new Event("cartUpdated"));
        } catch (error) {
            console.error("Error adding product to cart:", error);
        }
    }

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden
                        hover:shadow-lg transition duration-300">

            {/* Product Image */}
            <div className="h-56 bg-gray-100 flex items-center justify-center overflow-hidden relative">
                <img
                    src={`${import.meta.env.VITE_IMAGE_URL}/uploads/${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                />

                <button
                    onClick={handleAddToCart}
                    className="absolute bottom-3 right-3 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition"
                >
                    <BiSolidCartAdd className="text-xl" />
                </button>
            </div>

            {/* Product Content */}
            <div className="p-5">

                {/* Category */}
                {product.category && (
                    <span
                        className="inline-block text-xs font-semibold
                                text-blue-600 bg-blue-50
                                px-3 py-1 rounded-full"
                    >
                        {product.category.name}
                    </span>
                )}

                {/* Name */}
                <h3 className="text-lg font-semibold text-gray-900 mt-3">
                    {product.name}
                </h3>

                {/* Price */}
                <p className="text-xl font-bold text-gray-900 mt-2">
                    ₹{product.price.toLocaleString("en-IN")}
                </p>

                {/* Actions */}
                <div className="flex gap-2 mt-5">
                    <Link
                        to={`/products/${product._id}`}
                        className="flex-1 flex items-center justify-center h-10
                                bg-blue-600 text-white rounded-lg
                                font-medium hover:bg-blue-700 transition"
                    >
                        View
                    </Link>

                    <Link
                        to={`/edit-product/${product._id}`}
                        className="flex-1 flex items-center justify-center h-10
                                border border-gray-300
                                text-gray-700 rounded-lg
                                font-medium hover:bg-gray-100 transition"
                    >
                        Edit
                    </Link>

                    <button
                        onClick={handleDeleteProduct}
                        className="flex-1 flex items-center justify-center h-10
                                bg-red-600 text-white rounded-lg
                                font-medium hover:bg-red-700 transition"
                    >
                        Delete
                    </button>
                </div>

            </div>

        </div>
    );
};

export default ProductCard;
