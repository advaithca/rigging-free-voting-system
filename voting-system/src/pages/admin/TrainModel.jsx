import React, { useState } from "react";
import api from "../../api/voter.js";
import CustomAlert from "../../components/CustomAlert";
import LogoutButton from '../../components/auth/LogoutButton';
import Navbar from "../../components/Navbar.jsx";

const TrainModel = () => {
    const [resultAlert, setResultAlert] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setResultAlert(null);
        api.trainModel().then((res) => {
            if (res.success === true) {
                setResultAlert(<CustomAlert message={`Successfully trained! Accuracy ${res.accuracy}`} ifAlertSuccess={true} />);
            } else {
                setResultAlert(<CustomAlert message={res.error} ifAlertSuccess={false} />);
            }
        });
    }

    return (
        <div>
        <Navbar />
        <div className="max-w-[320px] mx-auto py-16 text-white">
            <h1 className="text-3xl font-bold">Image Upload</h1>

            <form className="w-full flex flex-col py-4" onSubmit={handleSubmit}>
                <button type="submit" className="bg-green-600 py-3 my-6 rounded font-bold hover:bg-green-900">
                    Train Model
                </button>
            </form>
            {resultAlert}
        </div>
        </div>
    );
}

export default TrainModel;