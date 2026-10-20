import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../data/api";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const [seePassword, setSeePassword] = useState(false)

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");

        try {
            await api.post(
                "/users/register",
                formData
            );

            navigate("/login");

        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        }
    };

    return (
        <div className="min-h-[calc(100vh-64px)] bg-gray-50
                        flex items-center justify-center px-4 py-4">

            <div className="w-full max-w-md bg-white rounded-xl
                            shadow-sm border border-gray-200 p-8">

                <div className="text-center mb-8">

                    <h1 className="text-2xl font-bold text-gray-900">
                        Create Account
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Create your MiniStore account
                    </p>

                </div>

                {error && (
                    <div className="mb-5 px-4 py-3 rounded-lg
                                    bg-red-50 border border-red-200
                                    text-red-600 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block text-sm font-medium
                                          text-gray-700 mb-2">
                            Username
                        </label>

                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter username"
                            required
                            className="w-full px-4 py-2.5
                                       border border-gray-300
                                       rounded-lg outline-none
                                       focus:ring-2 focus:ring-blue-500
                                       focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium
                                          text-gray-700 mb-2">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter email"
                            required
                            className="w-full px-4 py-2.5
                                       border border-gray-300
                                       rounded-lg outline-none
                                       focus:ring-2 focus:ring-blue-500
                                       focus:border-blue-500"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>

                        <div className="relative">
                            <input
                                type={seePassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                                className="w-full px-4 py-2.5 pr-11
                       border border-gray-300
                       rounded-lg outline-none
                       focus:ring-2 focus:ring-blue-500
                       focus:border-blue-500"
                            />

                            <button
                                type="button"
                                onClick={() => setSeePassword(!seePassword)}
                                className="absolute right-3 top-1/2
                       -translate-y-1/2
                       text-gray-500
                       hover:text-gray-700"
                            >
                                {seePassword ? (
                                    <FaEyeSlash size={18} />
                                ) : (
                                    <FaEye size={18} />
                                )}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2.5 rounded-lg
                                   bg-blue-600 text-white
                                   font-medium
                                   hover:bg-blue-700 transition"
                    >
                        Register
                    </button>

                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-blue-600 font-medium
                                   hover:text-blue-700"
                    >
                        Login
                    </Link>
                </p>

            </div>

        </div>
    );
};

export default Register;