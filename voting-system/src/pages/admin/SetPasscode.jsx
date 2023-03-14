import React, { useState } from "react";
import api from "../../api/auth.js";
import CustomAlert from "../../components/CustomAlert";
import LogoutButton from '../../components/auth/LogoutButton';
import Navbar from "../../components/Navbar.jsx";

const SetPasscode = () => {
    const [passcode, setPasscode] = useState("");
    const [resultAlert, setResultAlert] = useState(null);

    const handleInputChange = (event) => {
        setPasscode(event.target.value);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setResultAlert(null);
        console.log("Passcode set: ", passcode)
        api.setPasscodeInDatabase(passcode).then((res) => {
            if (res.success === true) {
                setResultAlert(<CustomAlert message={"Passcode has been reset"} ifAlertSuccess={true} />);
            } else {
                setResultAlert(<CustomAlert message={res.error} ifAlertSuccess={false} />);
            }
        });
    }

    return (
        <div>
        <Navbar />
        <div className="max-w-[320px] mx-auto py-16 text-white">
            <h1 className="text-3xl font-bold">Set/Change Passcode</h1>

            <form className="w-full flex flex-col py-4" onSubmit={handleSubmit}>
            <input
                        className="p-3 my-2 bg-gray-700 rouded"
                        type="text"
                        name="passcode"
                        onChange={handleInputChange}
                        value={passcode}
                        required
                    />
                <button type="submit" className="bg-green-600 py-3 my-6 rounded font-bold">
                    Set Passcode
                </button>
                <LogoutButton />
            </form>
            {resultAlert}
        </div>
        </div>
    );
}

export default SetPasscode;