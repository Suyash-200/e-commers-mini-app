
import { Link, useParams } from "react-router-dom";
import { getSingleProduct } from "../data/products";
import { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";

const ProductDetails = () => {
    const { id } = useParams();

    const [singleProduct, setSingleProduct] = useState(null)
    
    useEffect(() => {
        if (!id) return;

        getSingleProduct(id)
            .then((data) => {
                setSingleProduct(data);
            })
            .catch((error) => {
                console.error("Error fetching product:", error);
            });
    }, [id]);

    if (!singleProduct) {
        return <div className="p-10">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* Back Button */}
                <Link
                    to="/"
                    className="inline-flex items-center gap-2
                               text-gray-600 hover:text-blue-600
                               font-medium mb-8 transition flex items-center gap-1"
                >
                    <IoIosArrowRoundBack /> Back to Products
                </Link>

                {/* Product Details Card */}
                <div className="bg-white rounded-2xl border border-gray-200
                                overflow-hidden shadow-sm">

                    <div className="grid grid-cols-1 md:grid-cols-2">

                        {/* Image */}
                        <div className="bg-gray-100 min-h-112.5
                                        flex items-center justify-center">

                            <img
                                src={`${import.meta.env.VITE_IMAGE_URL}/uploads/${singleProduct.image}`}
                                alt={singleProduct.name}
                                className="w-full h-full max-h-137.5
                                           object-contain p-10"
                            />

                        </div>

                        {/* Details */}
                        <div className="p-8 lg:p-12 flex flex-col justify-center">

                            {/* Category */}
                            <span className="w-fit text-sm font-semibold
                                             text-blue-600 bg-blue-50
                                             px-3 py-1.5 rounded-full">
                                {singleProduct.category.name}
                            </span>

                            {/* Name */}
                            <h1 className="text-3xl lg:text-4xl
                                           font-bold text-gray-900 mt-5">
                                {singleProduct.name}
                            </h1>

                            {/* Price */}
                            <p className="text-3xl font-bold text-blue-600 mt-5">
                                ₹{singleProduct.price}
                            </p>

                            {/* Description */}
                            <div className="mt-6">
                                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                    Description
                                </h2>

                                <p className="text-gray-600 leading-7">
                                    {singleProduct.description}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3 mt-8">

                                <button
                                    className="flex-1 py-3 px-6
                                               bg-blue-600 text-white
                                               rounded-lg font-semibold
                                               hover:bg-blue-700 transition"
                                >
                                    Add to Cart
                                </button>

                                <Link
                                    to={`/edit-product/${singleProduct._id}`}
                                    className="px-6 py-3
                                               border border-gray-300
                                               text-gray-700 rounded-lg
                                               font-semibold
                                               hover:bg-gray-100 transition"
                                >
                                    Edit
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ProductDetails;
