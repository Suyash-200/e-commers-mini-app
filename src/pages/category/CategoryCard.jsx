
const CategoryCard = ({ category, onEdit, onDelete, handleViewProducts }) => {
    return (
        <div
            className="bg-white border border-gray-200
                       rounded-2xl p-6
                       hover:shadow-lg transition duration-300"
        >
            {/* Top Section */}
            <div className="flex items-start justify-between">

                {/* Icon */}
                <div
                    className="w-15 h-15 bg-blue-50
                               rounded-xl flex items-center
                               justify-center text-3xl p-1"
                >
                    <img className="w-full h-full object-contain"
                    src={`${import.meta.env.VITE_IMAGE_URL}/uploads/${category.image}`}
                    alt={category.name}
                />
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(category)}
                        className="px-3 py-1.5 text-sm
                                   text-blue-600
                                   border border-blue-200
                                   rounded-lg
                                   hover:bg-blue-50 transition"
                    >
                        Edit
                    </button>

                    <button
                        onClick={() => onDelete(category)}
                        className="px-3 py-1.5 text-sm
                                   text-red-600
                                   border border-red-200
                                   rounded-lg
                                   hover:bg-red-50 transition"
                    >
                        Delete
                    </button>
                </div>
            </div>

            {/* Category Info */}
            <h2 className="text-xl font-bold text-gray-900 mt-5">
                {category.name}
            </h2>

            <p className="text-gray-500 mt-2 leading-6">
                {category.description || "No description available."}
            </p>

            {/* Product Count */}
            <div
                className="flex items-center justify-between
                           mt-6 pt-5 border-t border-gray-100"
            >
                <span className="text-sm text-gray-500">
                    {category.count || 0} Products
                </span>

                <button onClick={() => handleViewProducts(category._id)}
                    className="text-blue-600 font-medium
                               hover:text-blue-700 transition"
                >
                    View Products →
                </button>
            </div>
        </div>
    );
};

export default CategoryCard;