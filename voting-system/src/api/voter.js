import axios from "axios";

const BASE_URL = "https://childlike-birds-production.up.railway.app"
const IMAGE_UPLOAD_URL_SUFFIX = "/voter/upload/voterDetails";
const TRAIN_MODEL_URL_SUFFIX = "/voter/train";
const VOTER_SCAN_URL_SUFFIX = "/voter/imageProcess";
const VOTER_DETAILS = "/voter/getDetails";

const uploadImage = async (imageLabel, image) => {
    console.log("Frontend api called with", imageLabel, image);
    try {
        const res = await axios.post(BASE_URL + IMAGE_UPLOAD_URL_SUFFIX, { label: imageLabel, photo: image }, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (e) {
        alert(e);
    }
}

const trainModel = async () => {
    try {
        const res = await axios.post(BASE_URL + TRAIN_MODEL_URL_SUFFIX, {});
        return res.data;
    } catch (e) {
        alert(e);
    }
}

const scanVoterImage = async (base64) => {
    try {
        const res = await axios.post(BASE_URL + VOTER_SCAN_URL_SUFFIX, { base64: base64 });
        return res.data;
    } catch (e) {
        alert(e);
    }
}

const voterDetails = async (base64) => {
    try {
        const res = await axios.get(BASE_URL + VOTER_DETAILS, {base64: base64, 'Access-Control-Allow-Origin':true});
        res.header("Access-Control-Allow-Origin", "*")
        return res.data;
    } catch(e) {
        alert(e);
    }
}
export default { uploadImage, scanVoterImage, trainModel, voterDetails };