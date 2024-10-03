import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 1 * 60 * 1000,
    headers: {
        'Content-Type': 'application/json'
    }
});
instance.interceptors.request.use((config) => {
    const rawSession = localStorage.getItem('session');
    if (rawSession !== null) {

        const session = JSON.parse(rawSession);
        if (session.accessToken) {
            config.headers.Authorization = `Bearer: ${session.accessToken}`;
        }
    }
    return config;
}, (error) => Promise.reject(error));
export default instance;