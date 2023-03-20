import axios from "axios";

export function getApi() {

    const headers = {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*'
        // 'Content-Type': 'application/x-www-form-urlencoded',
    }

    return axios.create({
        baseURL: 'http://localhost:5000/api',
        headers,
    });
}
