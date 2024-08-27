import axios from 'axios';

const BASE_URL = "http://127.0.0.1:8000/api/";

class RoulettechAPI {
    static token;

    static get authHeader() {
        return { Authorization: `Bearer ${RoulettechAPI.token}` };
    }

    static async request(endpoint, data = {}, method = 'get') {
        console.debug('API Call:', endpoint, data, method);

        const url = `${BASE_URL}${endpoint}`;
        const headers = RoulettechAPI.authHeader;
        const params = method === 'get' ? data : {};

        try {
            const response = await axios({ url, method, data, params, headers });
            return response.data;
        } catch (err) {
            console.error('API Error:', err?.response?.data?.err);
            let message = err.response?.data?.err || "Unknown error";
            throw Array.isArray(message) ? message : [message];
        }
    }

    // Signs up a new user and returns the authentication token
    static async signUp(data) {
        const res = await this.request('register', data, 'post');
        return res.token;
    }

    // Logs in a user and returns the authentication token
    static async login(data) {
        const res = await this.request('login', data, 'post');
        return res.token;
    }

    // Retrieves saved recipes for a specific user
    static async getCurrentUser(username) {
        return await this.request(`user/${username}/saved-recipes`);
    }


    // Adds a new recipe to the user's watchlist
    static async addRecipe(username, data) {
        return await this.request(`user/${username}/save-recipe`, data, 'post');
    }
}

export default RoulettechAPI;
