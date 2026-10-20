
const DeleteCategoryModal = ({
    isOpen,
    category,
    onClose,
    onConfirm,
}) => {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center
                       justify-center bg-black/50 px-4"
        >
            <div
                className="bg-white w-full max-w-md
                           rounded-2xl shadow-xl p-6"
            >
                {/* Header */}
                <div className="flex items-center gap-4">
                    <div
                        className="w-12 h-12 rounded-full
                                   bg-red-100 flex items-center
                                   justify-center text-xl"
                    >
                        🗑️
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-gray-900">
                            Delete Category
                        </h2>

                        <p className="text-gray-500 text-sm mt-1">
                            This action cannot be undone.
                        </p>
                    </div>
                </div>

                {/* Message */}
                <p className="text-gray-600 mt-5">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold text-gray-900">
                        {category?.name}
                    </span>
                    ?
                </p>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-7">
                    <button
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
                        onClick={onConfirm}
                        className="px-5 py-2.5
                                   bg-red-600 text-white
                                   rounded-lg font-medium
                                   hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteCategoryModal;
