import React, { useState } from "react";
import api from "../../api/voter.js";
import CustomAlert from "../../components/CustomAlert";
import LogoutButton from '../../components/auth/LogoutButton';

const ImageUpload = () => {
    const [inputs, setInputs] = useState({
        label: "",
    });
    const [files, setFiles] = useState({ photo: null });
    const [resultAlert, setResultAlert] = useState(null);

    const maxFileSizeMB = 10

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
        const photoSizeMB = files.photo.size / (1024 * 1024);
        if (photoSizeMB > maxFileSizeMB) {
            setResultAlert(<CustomAlert message="File size > 10 MB!" ifAlertSuccess={false} />);
        } else {
            api.uploadImage(inputs.label, files.photo).then((res) => {
                if (res.success === true) {
                    setResultAlert(<CustomAlert message="Successfully submitted!" ifAlertSuccess={true} />);
                } else {
                    setResultAlert(<CustomAlert message={res.error} ifAlertSuccess={false} />);
                }
            });
        }
        setInputs({
            label: "",
        });
    }

    return (
        <div className="max-w-[320px] mx-auto py-16 text-white">
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
                <LogoutButton />
            </form>
            {resultAlert}
        </div>
    );
}

export default ImageUpload;