const CategoryModal = ({
    isOpen,
    onClose,
    formData,
    onChange,
    onSubmit,
    editingCategory,
}) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center
                       justify-center bg-black/50 px-4"
        >
            <div
                className="bg-white w-full max-w-lg
                           rounded-2xl shadow-xl"
            >
                {/* Header */}
                <div
                    className="flex items-center justify-between
                               px-6 py-5 border-b"
                >
                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            {editingCategory
                                ? "Edit Category"
                                : "Add Category"}
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            {editingCategory
                                ? "Update category details."
                                : "Create a new product category."}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-700
                                   text-2xl"
                    >
                        ×
                    </button>
                </div>

                {/* Form */}
                <form
                    onSubmit={onSubmit}
                    className="p-6 space-y-5"
                >
                    {/* Name */}
                    <div>
                        <label
                            className="block text-sm font-medium
                                       text-gray-700 mb-2"
                        >
                            Category Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={onChange}
                            placeholder="Enter category name"
                            required
                            className="w-full px-4 py-2.5
                                       border border-gray-300
                                       rounded-lg outline-none
                                       focus:ring-2
                                       focus:ring-blue-500"
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label
                            className="block text-sm font-medium
                                       text-gray-700 mb-2"
                        >
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={onChange}
                            placeholder="Enter category description"
                            rows="4"
                            className="w-full px-4 py-2.5
                                       border border-gray-300
                                       rounded-lg outline-none
                                       resize-none
                                       focus:ring-2
                                       focus:ring-blue-500"
                        />
                    </div>

                    {/* Icon */}
                    <div>
                        <label
                            className="block text-sm font-medium
                   text-gray-700 mb-2"
                        >
                            Icon
                        </label>

                        {editingCategory?.icon && (
                            <div className="mb-3">
                                <p className="text-xs text-gray-500 mb-2">
                                    Current Image
                                </p>

                                <img
                                    src={editingCategory.icon}
                                    alt={editingCategory.name}
                                    className="w-16 h-16 object-cover rounded-lg border"
                                />
                            </div>
                        )}

                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            onChange={onChange}
                            className="w-full px-4 py-2.5
                   border border-gray-300
                   rounded-lg outline-none
                   focus:ring-2
                   focus:ring-blue-500"
                        />

                        {formData.image && (
                            <p className="text-xs text-gray-500 mt-2">
                                New image selected: {formData.image.name}
                            </p>
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2.5
                                       border border-gray-300
                                       rounded-lg font-medium
                                       text-gray-700
                                       hover:bg-gray-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            className="px-5 py-2.5
                                       bg-blue-600 text-white
                                       rounded-lg font-medium
                                       hover:bg-blue-700"
                        >
                            {editingCategory
                                ? "Update Category"
                                : "Add Category"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CategoryModal;
