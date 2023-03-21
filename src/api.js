import axios from "axios";

export function getApi() {

    const headers = {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
        // 'Content-Type': 'application/x-www-form-urlencoded',
    }

    return axios.create({
        baseURL: 'https://test-bo-api.onrender.com/api',
        headers,
    });
}
