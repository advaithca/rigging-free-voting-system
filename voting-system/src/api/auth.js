import axios from "axios";

const BASE_URL = "http://localhost:5000"
const SET_PASSCODE_URL_SUFFIX = "/voter/setPasscode";
const GET_PASSCODE_URL_SUFFIX = "/voter/getPasscode";

const setPasscodeInDatabase = async (passcode) => {
    try {
        const res = await axios.post(BASE_URL + SET_PASSCODE_URL_SUFFIX, { code: passcode }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
        return res.data;
    } catch (e) {
        alert(e);
    }
}

const getPasscodeInDatabase = async () => {
    try {
        const res = await axios.get(BASE_URL + GET_PASSCODE_URL_SUFFIX);
        return res.data;
    } catch (e) {
        alert(e);
    }
}

export default { setPasscodeInDatabase, getPasscodeInDatabase };