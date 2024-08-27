import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

class RoulettechAPI {
    static token;

    static get authHeader() {
        return this.token ? { Authorization: `Bearer ${this.token}` } : {};
    }

    static async request(endpoint, data = {}, method = 'get') {
        const url = `${BASE_URL}${endpoint}`;
        const headers = {
            'Content-Type': 'application/json',
            ...this.authHeader,
        };
        const params = method === 'get' ? data : {};

        try {
            const response = await axios({
                url,
                method,
                data: method !== 'get' ? data : {},
                params,
                headers,
            });
            return response.data;
        } catch (err) {
            console.error('API error', err);
            throw err;
        }
    }

    // Signs up a new user and returns the authentication token
    static async signUp(data) {
        const res = await this.request('/register', data, 'post');
        console.log('sign up response:', res); // Improved log message
        return res.token.access;
    }

    // Logs in a user and returns the authentication token
    static async login(data) {
        const res = await this.request('/login', data, 'post');
        console.log('login response:', res);
        return res.token.access;
    }

    // Retrieves saved recipes for a specific user
    static async getCurrentUser(username) {
        const res = await this.request(`/user/${username}/saved-recipes`);
        console.log('getUser', res);
        return res;
    }

    // Adds a new recipe to the user's watchlist
    static async addRecipe(username, data) {
        return await this.request(
            `/user/${username}/save-recipe`,
            data,
            'post'
        );
    }
}

export default RoulettechAPI;
