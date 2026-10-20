
import { getAllProduct } from "../data/products";
import ProductCard from "../components/ProductCard";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Products = () => {
    const [searchParams] = useSearchParams();

    const categoryId = searchParams.get("category");
    const [products, setProducts] = useState([])
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sort, setSort] = useState("");
    const [page, setPage] = useState(1);
    const [limit] = useState(6);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        getAllProduct({
            search,
            category: categoryId || category,
            minPrice,
            maxPrice,
            sort,
            page,
            limit
        })
            .then((data) => {
                setProducts(data.docs);
                setTotalPages(data.totalPages);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
            });
    }, [
        search,
        category,
        categoryId,
        minPrice,
        maxPrice,
        sort,
        page,
        limit
    ]);

    const clearFilter = () => {
        setCategory("");
        setMaxPrice("");
        setMinPrice("");
        setSearch("");
        setSort("");
        setPage(1);
    };

    return (
        <div className="min-h-screen bg-gray-50">

            {/* Page Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">
                        All Products
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Browse our collection of quality products.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Sidebar */}
                    <Sidebar search={search} setSearch={setSearch} category={category} setCategory={setCategory} minPrice={minPrice} setMinPrice={setMinPrice} maxPrice={maxPrice} setMaxPrice={setMaxPrice} clearFilter={clearFilter} />

                    {/* Products */}
                    <main className="flex-1">

                        {/* Product Header */}
                        <div className="flex items-center justify-between mb-5">
                            <p className="text-gray-600">
                                Showing{" "}
                                <span className="font-semibold text-gray-900">
                                    {products.length}
                                </span>{" "}
                                products
                            </p>

                            <select
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                                className="border border-gray-300 rounded-lg
                                    px-4 py-2 bg-white
                                    text-gray-700 outline-none
                                    focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Sort by</option>
                                <option value="price_asc">Price: Low to High</option>
                                <option value="price_desc">Price: High to Low</option>
                                <option value="name_asc">Name: A-Z</option>
                            </select>
                        </div>

                        {/* Product Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        product={product}
                                        setProducts={setProducts}
                                    />
                                ))
                            ) : (
                                <div className="col-span-full text-center py-20">
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        No Products Found
                                    </h3>

                                    <p className="text-gray-500 mt-2">
                                        Try changing your search or filters.
                                    </p>

                                    <button
                                        onClick={clearFilter}
                                        className="mt-5 px-5 py-2 bg-blue-600 text-white rounded-lg"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            )}
                        </div>
                        {products.length > 0 && (
                            <div className="flex justify-center items-center gap-3 mt-8">

                                <button
                                    disabled={page === 1}
                                    onClick={() => setPage(page - 1)}
                                    className="px-4 py-2 border rounded-lg
                   disabled:opacity-50"
                                >
                                    Previous
                                </button>

                                <span className="text-gray-600">
                                    Page {page} of {totalPages}
                                </span>

                                <button
                                    disabled={page === totalPages}
                                    onClick={() => setPage(page + 1)}
                                    className="px-4 py-2 border rounded-lg
                   disabled:opacity-50"
                                >
                                    Next
                                </button>

                            </div>
                        )}
                    </main>

                </div>

            </div>

        </div>
    );
};

export default Products;