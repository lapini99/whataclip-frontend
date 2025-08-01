import axios from 'axios';

class Api {
    APIBaseUrl = "http://localhost:8000"

    instance = axios.create({
        baseURL: this.APIBaseUrl,
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });
}

export default Api;
