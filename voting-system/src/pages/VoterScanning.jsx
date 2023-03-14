import React, { useState } from "react";
import Webcam from "react-webcam";
import api from "../api/voter.js";
import CustomAlert from "../components/CustomAlert";

const VoterScanning = () => {
    const [pictureBase64Encoding, setPictureBase64Encoding] = useState(null);
    const [capturedAtleastOnce, setCapturedAtleastOnce] = useState(false);
    const [resultAlert, setResultAlert] = useState(null);

    const webcamRef = React.useRef(null);
    const WebcamComponent = () => <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />;

    const capture = React.useCallback(
        () => {
            const imageBase64Encoding = webcamRef.current.getScreenshot();
            setPictureBase64Encoding(imageBase64Encoding);
            setCapturedAtleastOnce(true);
        },
        [webcamRef]
    );

    const validate = () => {
        api.scanVoterImage(pictureBase64Encoding).then((res) => {
            console.log(res)
            if (res.success === true) {
                setResultAlert(<CustomAlert message={res.result} ifAlertSuccess={res.validity} />);
            } else {
                setResultAlert(<CustomAlert message={res.error} ifAlertSuccess={false} />);
            }
        });
    }

    return (
        <div className="max-w-[320px] mx-auto py-16 text-white">
            <h1 className="text-3xl font-bold">Live Elections</h1>
            {WebcamComponent()}
            <button onClick={capture} className="bg-green-600 py-3 my-6 rounded font-bold w-full">Capture</button>
            <img height="150px" width="150px" src={pictureBase64Encoding} alt="Capture" />
            <button onClick={validate} className={"bg-red-600 py-3 my-6 rounded font-bold w-full" + (capturedAtleastOnce ? "" : " invisible")}>Validate voter</button>
            {resultAlert}
        </div>
    );
};

export default VoterScanning;
