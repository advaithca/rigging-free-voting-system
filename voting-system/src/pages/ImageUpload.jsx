import React, { useState } from "react";
import api from "../api/voter.js";
import CustomAlert from "../components/CustomAlert";

const ImageUpload = () => {
    const [inputs, setInputs] = useState({
        label: "",
    });
    const [files, setFiles] = useState({ photo: null });
    const [resultAlert, setResultAlert] = useState(null);

    const handleInputChange = (event) => {
        setInputs((prevInputs) => ({
            ...prevInputs,
            [event.target.name]: event.target.value
        }));
    } /* created common function for all non-file inputs */

    const handleFileChange = (event) => {
        setFiles({ ...files, [event.target.name]: event.target.files[0] });
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setResultAlert(null);
        api.uploadImage(inputs.label, files.photo).then((res) => {
            if (res.success === true) {
                setResultAlert(<CustomAlert message="Successfully submitted!" ifAlertSuccess={true}/>);
            } else {
                setResultAlert(<CustomAlert message={res.error} ifAlertSuccess={false}/>);
            }
        });
        setInputs({
            label: "",
        });
    }

    return (<div className="w-full h-screen">
        <img className="hidden sm:block absolute w-full h-full object-cover bg-gray-800" />
        <div className="bg-black/60 fixed top-0 left-0 w-full h-screen"></div>
        <div className="fixed w-full px-4 py-24 z-50">
            <div className="max-w-[450px] h-[600px] mx-auto bg-black/75 text-white">
                <div className="max-w-[320px] mx-auto py-16">
                    <h1 className="text-3xl font-bold">Image Upload</h1>

                    <form className="w-full flex flex-col py-4" onSubmit={handleSubmit}>
                        <input
                            className="p-3 my-2 bg-gray-700 rouded"
                            type="text"
                            placeholder="Label"
                            name="label"
                            onChange={handleInputChange}
                            value={inputs.label}
                            required
                        />
                        <input
                            className="p-3 my-2 bg-gray-700 rouded"
                            type="file"
                            name="photo"
                            onChange={handleFileChange}
                            required
                        />
                        <button type="submit" className="bg-green-600 py-3 my-6 rounded font-bold">
                            Upload
                        </button>
                    </form>
                    {resultAlert}
                </div>
            </div>
        </div>
    </div>);
}

export default ImageUpload;