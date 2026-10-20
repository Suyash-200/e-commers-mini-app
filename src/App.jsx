import { BrowserRouter, Routes, Route } from "react-router-dom";

import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Categories from "./pages/Categories";

import Login from "./auth/Login";
import Register from "./auth/Register";

import PublicRoute from "./components/PublicRoute";
import ProtectedLayout from "./components/ProtectedLayout";

import "./App.css";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";

const App = () => {
    return (
        <BrowserRouter future={{ v7_startTransition: true }}>

            <Routes>

                {/* =========================
                    PUBLIC ROUTES
                ========================= */}

                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    }
                />


                {/* =========================
                    PROTECTED ROUTES
                    Navbar is inside ProtectedLayout
                ========================= */}

                <Route element={<ProtectedLayout />}>

                    <Route
                        path="/"
                        element={<Products />}
                    />

                    <Route
                        path="/products/:id"
                        element={<ProductDetails />}
                    />

                    <Route
                        path="/add-product"
                        element={<AddProduct />}
                    />

                    <Route
                        path="/edit-product/:id"
                        element={<EditProduct />}
                    />

                    <Route
                        path="/categories"
                        element={<Categories />}
                    />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/orders" element={<Orders />} />
                </Route>

            </Routes>

        </BrowserRouter>
    );
};

export default App;