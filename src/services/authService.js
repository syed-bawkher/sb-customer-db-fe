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
    }
};

export default authService;
