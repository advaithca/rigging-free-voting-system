import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "../../components/auth/LogoutButton";

const AdminDashboard = () => {

    return (
        <div className="w-full h-screen">
            <img className="hidden sm:block absolute w-full h-full object-cover bg-gray-800" />
            <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
            <div className="fixed w-full px-4 py-24 z-50">
                <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
                    <div className="max-w-[320px] mx-auto py-16">
                        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                        <Link to="/imageUpload">
                            <div className="text-gray-600">Upload Image</div>{" "}
                        </Link>
                        <Link to="/trainModel">
                            <div className="text-gray-600">Train Model</div>{" "}
                        </Link>
                        <LogoutButton />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
