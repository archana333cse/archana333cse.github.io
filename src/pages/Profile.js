import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Profile({ user }) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">
            <div className="max-w-6xl mx-auto flex gap-6">

                {/* Left Sidebar */}
                <div className="w-1/4 bg-white rounded-xl shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">My Account</h2>
                    <ul className="space-y-3 text-gray-700">
                        <li className="font-medium text-blue-600">
                            Profile Information
                        </li>
                        <li>
                            <Link
                                to="/orders"
                                className="hover:text-blue-600 cursor-pointer block"
                            >
                                My Orders
                            </Link>
                        </li>

                        <li className="hover:text-blue-600 cursor-pointer">
                            Addresses
                        </li>
                        <li className="hover:text-blue-600 cursor-pointer">
                            Change Password
                        </li>
                    </ul>
                </div>

                {/* Right Content */}
                <div className="flex-1 bg-white rounded-xl shadow p-8">
                    <h1 className="text-2xl font-bold mb-6">
                        Personal Information
                    </h1>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <label className="text-sm text-gray-500">Full Name</label>
                            <p className="text-lg font-medium">{user.fullName}</p>
                        </div>

                        <div>
                            <label className="text-sm text-gray-500">Email</label>
                            <p className="text-lg font-medium">{user.email}</p>
                        </div>
                    </div>

                    <button className="mt-8 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Edit Profile
                    </button>
                </div>

            </div>
        </div>
    );
}
