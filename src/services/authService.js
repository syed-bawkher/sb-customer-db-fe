import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

const authService = {
    login: async (username, password) => {
        const data = JSON.stringify({
            username,
            password
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${BASE_URL}/auth/login`,
            headers: { 
                'Content-Type': 'application/json'
            },
            data: data
        };

        try {
            const response = await axios.request(config);
            const token = response.data.token;
            // Save the token in session storage
            sessionStorage.setItem('bearer_token', token);
            return token;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    },

    validateToken: async () => {
        const token = sessionStorage.getItem('bearer_token');
        if (!token) {
            throw new Error('No token found');
        }

        const data = JSON.stringify({
            token
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${BASE_URL}/auth/validate`,
            headers: { 
                'Content-Type': 'application/json'
            },
            data: data
        };

        try {
            const response = await axios.request(config);
            return response.data; // response.data should contain { valid: true, decoded: {...} } if token is valid
        } catch (error) {
            console.error('Error validating token:', error);
            throw error;
        }
    }
};

export default authService;
