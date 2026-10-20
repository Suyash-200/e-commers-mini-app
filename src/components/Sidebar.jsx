import { useEffect, useState } from "react";
import { getAllCategory } from "../data/category";

const Sidebar = ({
    search,
    setSearch,
    category,
    setCategory,
    minPrice,
    maxPrice,
    setMinPrice,
    setMaxPrice,
    clearFilter
}) => {

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

    return (
        <aside className="w-full lg:w-64 bg-white border border-gray-200
                          rounded-xl p-5 h-fit">

            {/* Search */}
            <div className="mb-7">

                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Search
                </h3>

                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products..."
                    className="w-full px-4 py-2.5
                               border border-gray-300 rounded-lg
                               outline-none
                               focus:ring-2 focus:ring-blue-500
                               focus:border-blue-500"
                />

            </div>


            {/* Categories */}
            <div className="mb-7">

                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Categories
                </h3>

                <div className="space-y-3">

                    {/* All Products */}
                    <label className="flex items-center gap-3 text-gray-600 cursor-pointer">

                        <input
                            type="radio"
                            name="category"
                            value=""
                            checked={category === ""}
                            onChange={() => setCategory("")}
                            className="w-4 h-4 accent-blue-600"
                        />

                        All Products

                    </label>


                    {/* Dynamic Categories */}
                    {categories.map((item) => (

                        <label
                            key={item._id}
                            className="flex items-center gap-3 text-gray-600 cursor-pointer"
                        >

                            <input
                                type="radio"
                                name="category"
                                value={item._id}
                                checked={category === item._id}
                                onChange={() => setCategory(item._id)}
                                className="w-4 h-4 accent-blue-600"
                            />

                            {item.name}

                        </label>

                    ))}

                </div>

            </div>


            {/* Price */}
            <div className="mb-7">

                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Price Range
                </h3>

                <div className="space-y-3">

                    <label className="flex items-center gap-3 text-gray-600 cursor-pointer">
                        <input
                            type="radio"
                            name="price"
                            checked={minPrice === "" && maxPrice === ""}
                            onChange={() => {
                                setMinPrice("");
                                setMaxPrice("");
                            }}
                            className="w-4 h-4 accent-blue-600"
                        />
                        All Prices
                    </label>

                    <label className="flex items-center gap-3 text-gray-600 cursor-pointer">
                        <input
                            type="radio"
                            name="price"
                            checked={minPrice === "" && maxPrice === "1000"}
                            onChange={() => {
                                setMinPrice("");
                                setMaxPrice("1000");
                            }}
                            className="w-4 h-4 accent-blue-600"
                        />
                        Under ₹1,000
                    </label>

                    <label className="flex items-center gap-3 text-gray-600 cursor-pointer">
                        <input
                            type="radio"
                            name="price"
                            checked={minPrice === "1000" && maxPrice === "2000"}
                            onChange={() => {
                                setMinPrice("1000");
                                setMaxPrice("2000");
                            }}
                            className="w-4 h-4 accent-blue-600"
                        />
                        ₹1,000 - ₹2,000
                    </label>

                    <label className="flex items-center gap-3 text-gray-600 cursor-pointer">
                        <input
                            type="radio"
                            name="price"
                            checked={minPrice === "2000" && maxPrice === "3000"}
                            onChange={() => {
                                setMinPrice("2000");
                                setMaxPrice("3000");
                            }}
                            className="w-4 h-4 accent-blue-600"
                        />
                        ₹2,000 - ₹3,000
                    </label>

                    <label className="flex items-center gap-3 text-gray-600 cursor-pointer">
                        <input
                            type="radio"
                            name="price"
                            checked={minPrice === "3000" && maxPrice === ""}
                            onChange={() => {
                                setMinPrice("3000");
                                setMaxPrice("");
                            }}
                            className="w-4 h-4 accent-blue-600"
                        />
                        Above ₹3,000
                    </label>

                </div>

            </div>


            {/* Clear Filters */}
            <button
                onClick={clearFilter}
                className="w-full py-2.5
                           border border-gray-300
                           rounded-lg
                           text-gray-700 font-medium
                           hover:bg-gray-100 transition cursor-pointer"
            >
                Clear Filters
            </button>

        </aside>
    );
};

export default Sidebar;