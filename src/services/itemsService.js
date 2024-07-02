import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

// Function to get the bearer token from session storage
const getBearerToken = () => {
    return sessionStorage.getItem('bearer_token');
};

const itemsService = {
    createMultipleItems(orderNo, items) {
        const data = JSON.stringify({
            orderNo,
            items
        });

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${BASE_URL}/items`,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getBearerToken()}`
            },
            data: data
        };

        return axios.request(config)
            .then(response => response.data)
            .catch(error => {
                console.error("Error posting items:", error);
                throw error;  // Rethrow to ensure error handling continues in the calling context
            });
    },
    getOrderItems(orderNo) {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${BASE_URL}/items/order/${encodeURIComponent(orderNo)}`,
            headers: {
                'Authorization': `Bearer ${getBearerToken()}`
            }
        };

        return axios.request(config)
            .then(response => response.data)
            .catch(error => {
                console.error("Error fetching order items:", error);
                throw error;  // Rethrow to ensure error handling continues in the calling context
            });
    }
}

export default itemsService;