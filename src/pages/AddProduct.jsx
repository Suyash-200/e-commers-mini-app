
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { getAllProduct, addProduct } from "../data/products";
import { getAllCategory } from "../data/category";
import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const AddProduct = () => {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        categoryType: "",
        image: null
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getAllCategory()
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAddProduct = async (e) => { 
        e.preventDefault(); 
        try { 
            const res = await addProduct(formData); 
            getAllProduct()
            navigate("/"); 
        } catch (error) { 
            console.error("Add product error:", error); 
        } 
    };

    if (!formData) {
        return <div className="p-10">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50">

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

                {/* Header */}
                <div className="mb-8">

                    <Link
                        to="/"
                        className="text-gray-500 hover:text-blue-600
                                   transition flex items-center gap-1"
                    >
                        <IoIosArrowRoundBack /> Back to Products
                    </Link>

                    <h1 className="text-3xl font-bold text-gray-900 mt-5">
                        Add Product
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Add a new product to your store.
                    </p>

                </div>

                {/* Form */}
                <div className="bg-white border border-gray-200
                                rounded-2xl p-6 sm:p-8 shadow-sm">

                    <form onSubmit={handleAddProduct}>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Product Name */}
                            <div className="md:col-span-2">

                                <label className="block text-sm font-medium
                                                  text-gray-700 mb-2">
                                    Product Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter product name"
                                    className="w-full px-4 py-3
                                               border border-gray-300
                                               rounded-lg outline-none
                                               focus:ring-2
                                               focus:ring-blue-500
                                               focus:border-blue-500"
                                />

                            </div>

                            {/* Price */}
                            <div>

                                <label className="block text-sm font-medium
                                                  text-gray-700 mb-2">
                                    Price
                                </label>

                                <input
                                    type="number"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="Enter price"
                                    className="w-full px-4 py-3
                                               border border-gray-300
                                               rounded-lg outline-none
                                               focus:ring-2
                                               focus:ring-blue-500
                                               focus:border-blue-500"
                                />

                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium
                                                text-gray-700 mb-2">
                                    Category
                                </label>

                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3
                                            border border-gray-300
                                            rounded-lg outline-none
                                            bg-white
                                            focus:ring-2
                                            focus:ring-blue-500
                                            focus:border-blue-500"
                                >
                                    <option value="">
                                        Select category
                                    </option>

                                    {categories.map((category) => (
                                        <option
                                            key={category._id}
                                            value={category._id}
                                        >
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Image */}
                            <div className="md:col-span-2">

                                <label className="block text-sm font-medium
                                                  text-gray-700 mb-2">
                                    Product Image
                                </label>

                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={(e) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            image: e.target.files[0]
                                        }))
                                    }
                                    className="w-full px-4 py-3
                                            border border-gray-300
                                            rounded-lg outline-none
                                            focus:ring-2
                                            focus:ring-blue-500
                                            focus:border-blue-500"
                                />

                            </div>

                            {/* Description */}
                            <div className="md:col-span-2">

                                <label className="block text-sm font-medium
                                                  text-gray-700 mb-2">
                                    Description
                                </label>

                                <textarea
                                    rows="5"
                                    name="description"
                                    onChange={handleChange}
                                    value={formData.description}
                                    placeholder="Enter product description"
                                    className="w-full px-4 py-3
                                               border border-gray-300
                                               rounded-lg outline-none
                                               resize-none
                                               focus:ring-2
                                               focus:ring-blue-500
                                               focus:border-blue-500"
                                ></textarea>

                            </div>

                        </div>

                        {/* Buttons */}
                        <div className="flex justify-end gap-3 mt-8 pt-6
                                        border-t border-gray-200">

                            <Link
                                to="/"
                                className="px-6 py-3 border border-gray-300
                                           rounded-lg text-gray-700
                                           font-medium
                                           hover:bg-gray-100 transition"
                            >
                                Cancel
                            </Link>

                            <button
                                type="submit"
                                className="px-6 py-3 bg-blue-600
                                           text-white rounded-lg
                                           font-medium
                                           hover:bg-blue-700 transition"
                            >
                                Add Product
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default AddProduct;
