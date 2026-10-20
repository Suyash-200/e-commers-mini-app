import { Link, useNavigate } from "react-router-dom";
import { deleteCategory, getAllCategory, addCategory, updateCategory } from "../data/category";
import { useEffect, useState } from "react";
import CategoryCard from "./category/CategoryCard";
import CategoryModal from "./category/CategoryModal";
import DeleteCategoryModal from "./category/DeleteCategoryModal";


const Categories = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const [editingCategory, setEditingCategory] = useState(null);
    const [deletingCategory, setDeletingCategory] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: null,
    });

    // Get categories
    useEffect(() => {
        getAllCategory()
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
            });
            
    }, []);
    // Add
    const handleAdd = () => {
        setEditingCategory(null);

        setFormData({
            name: "",
            description: "",
            image: null,
        });

        setIsModalOpen(true);
    };

    // Edit
    const handleEdit = (category) => {
        console.log("EDIT CATEGORY:", category);
        setEditingCategory(category);

        setFormData({
            name: category.name || "",
            description: category.description || "",
            image: null,
        });

        setIsModalOpen(true);
    };

    // Input change
    const handleChange = (e) => {
        const { name, value, files } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: name === "image" ? files?.[0] || null : value,
        }));
    };

    // Add / Edit submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (editingCategory) {

                // EDIT
                // Keep your edit API here
                await updateCategory(editingCategory._id, formData);

                const updatedCategories = await getAllCategory();
                setCategories(updatedCategories);

            } else {

                // ADD
                await addCategory(formData);

                // Get fresh categories from MongoDB
                const updatedCategories = await getAllCategory();
                setCategories(updatedCategories);
            }

            setIsModalOpen(false);

        } catch (error) {
            console.error("Error saving category:", error);
        }
    };

    // Delete modal
    const handleDeleteClick = (category) => {

        setDeletingCategory(category);
        setIsDeleteModalOpen(true);
    };

    // Delete
    const handleDelete = async () => {
        if (!deletingCategory) return;

        try {
            await deleteCategory(deletingCategory._id);

            setCategories((prev) =>
                prev.filter(
                    (category) =>
                        category._id !== deletingCategory._id
                )
            );

            setDeletingCategory(null);
            setIsDeleteModalOpen(false);

        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    const handleViewProducts = (categoryId) => {
        navigate(`/?category=${categoryId}`);
    };

    return (
        <div className="min-h-screen bg-gray-50">

            <div
                className="max-w-7xl mx-auto px-4
                           sm:px-6 lg:px-8 py-10"
            >

                {/* Header */}
                <div
                    className="mb-10 flex flex-col
                               sm:flex-row sm:items-center
                               sm:justify-between gap-4"
                >
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Categories
                        </h1>

                        <p className="text-gray-500 mt-2">
                            Explore and manage your product categories.
                        </p>
                    </div>

                    <button
                        onClick={handleAdd}
                        className="px-5 py-2.5
                                   bg-blue-600 text-white
                                   rounded-lg font-medium
                                   hover:bg-blue-700 transition"
                    >
                        + Add Category
                    </button>
                </div>

                {/* Category Grid */}
                {categories.length > 0 ? (
                    <div
                        className="grid grid-cols-1
                                   md:grid-cols-2
                                   lg:grid-cols-3 gap-6"
                    >
                        {categories.map((category) => (
                            <CategoryCard
                                key={category._id}
                                category={category}
                                onEdit={handleEdit}
                                onDelete={handleDeleteClick}
                                handleViewProducts={handleViewProducts}
                            />
                        ))}
                    </div>
                ) : (
                    <div
                        className="bg-white border border-gray-200
                                   rounded-2xl p-12 text-center"
                    >
                        <div className="text-5xl mb-4">
                            📦
                        </div>

                        <h2 className="text-xl font-semibold text-gray-900">
                            No Categories Found
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Start by adding your first category.
                        </p>

                        <button
                            onClick={handleAdd}
                            className="mt-5 px-5 py-2.5
                                       bg-blue-600 text-white
                                       rounded-lg font-medium
                                       hover:bg-blue-700 transition"
                        >
                            + Add Category
                        </button>
                    </div>
                )}

                {/* Add Product */}
                <div
                    className="mt-10 bg-blue-50
                               border border-blue-100
                               rounded-2xl p-6
                               flex flex-col sm:flex-row
                               items-center justify-between gap-4"
                >
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            Want to add a product?
                        </h3>

                        <p className="text-gray-500 mt-1">
                            Add products to your existing categories.
                        </p>
                    </div>

                    <Link
                        to="/add-product"
                        className="px-5 py-2.5
                                   bg-blue-600 text-white
                                   rounded-lg font-medium
                                   hover:bg-blue-700 transition"
                    >
                        Add Product
                    </Link>
                </div>
            </div>

            {/* Add / Edit */}
            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                editingCategory={editingCategory}
            />

            {/* Delete */}
            <DeleteCategoryModal
                isOpen={isDeleteModalOpen}
                category={deletingCategory}
                onClose={() => {
                    setIsDeleteModalOpen(false);
                    setDeletingCategory(null);
                }}
                onConfirm={handleDelete}
            />
        </div>
    );
};

export default Categories;