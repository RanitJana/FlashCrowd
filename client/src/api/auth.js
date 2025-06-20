import axios from "axios";

const handleLogin = async function (body) {
    try {
        let response = await axios.post(
            `${import.meta.env.VITE_BACKEND_URI}/api/v1/login`,
            body,
            {
                withCredentials: true,
            }
        );

        return response;
    } catch (error) {
        return error?.response;
    }
};

export { handleLogin }