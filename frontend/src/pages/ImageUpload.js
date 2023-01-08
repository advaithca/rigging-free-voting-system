import React, { useState } from "react";

const ImageUpload = () => {
    const [inputs, setInputs] = useState({
        label: "",
    });
    const [files, setFiles] = useState({photo: null});

    const handleInputChange = (event) => {
        setInputs((prevInputs) => ({
            ...prevInputs,
            [event.target.name]: event.target.value
        }));
    } /* created common function for all non-file inputs */

    const handleFileChange = (event) => {
        setFiles(event.target.files[0]);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Have submitted!", inputs, files);
    }

    return <div style={{ backgroundColor: "yellow" }}>
        <p>Image Upload Form</p>
        <form onSubmit={handleSubmit}>
            <label> Enter label:
                <input type="Text" name="label" onChange={handleInputChange} required />
            </label>
            <label> Upload image:
                <input type="file" name="photo" onChange={handleFileChange} required />
            </label>
            <button type="submit" style={{ backgroundColor: "grey" }}> submit </button>
        </form>
    </div>;
}

export default ImageUpload;