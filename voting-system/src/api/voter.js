import axios from "axios";

const BASE_URL = "http://localhost:5000"
const IMAGE_UPLOAD_URL_SUFFIX = "/voter/upload/voterDetails";

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

export default { uploadImage };