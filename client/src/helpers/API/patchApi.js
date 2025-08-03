import toast from "react-hot-toast";
import apiInfo from "./apiInfo";
import axios from "axios";

async function patchApi(path, data) {
    axios.defaults.withCredentials = true;

    let response;

    await axios
        .patch(apiInfo.URL + path, data, {
            withCredentials: true,
        })
        .then((res) => {
            response = res;
        })
        .catch((err) => {
            console.log(err);
            if (err.response?.data?.message) {
                toast.error(err.response.data.message);
            } else {
                toast.error("An error occurred");
            }
            response = err;
        });

    return response;
}

export default patchApi;
