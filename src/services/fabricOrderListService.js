import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

// Function to get the bearer token from session storage
const getBearerToken = () => {
    return sessionStorage.getItem('bearer_token');
};

const fabricOrderService = {
    getAllFabricOrders() {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${BASE_URL}/fabric-orders`,
            headers: {
                'Authorization': `Bearer ${getBearerToken()}`
            }
        };

        return axios.request(config)
            .then(response => response.data)
            .catch(error => {
                console.error("Error fetching fabric orders:", error);
                throw error;  // Rethrow to ensure error handling continues in the calling context
            });
    },

    getFabricOrderById(orderId) {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${BASE_URL}/fabric-order/${encodeURIComponent(orderId)}`,
            headers: {
                'Authorization': `Bearer ${getBearerToken()}`
            }
        };

        return axios.request(config)
            .then(response => response.data)
            .catch(error => {
                console.error("Error fetching fabric order by ID:", error);
                throw error;  // Rethrow to ensure error handling continues in the calling context
            });
    },

    getFabricOrdersByFabricCode(fabricCode) {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${BASE_URL}/fabric-orders/code/${encodeURIComponent(fabricCode)}`,
            headers: {
                'Authorization': `Bearer ${getBearerToken()}`
            }
        };
        
        return axios.request(config).then(response => response.data)
            .catch(error => {
                console.error("Error fetching fabric orders by fabric code:", error);
                throw error;  // Rethrow to ensure error handling continues in the calling context
            });
    },

    createFabricOrder(order) {
        const data = JSON.stringify(order);
        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${BASE_URL}/fabric-order`,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getBearerToken()}`
            },
            data: data
        };

        return axios.request(config)
            .then(response => response.data)
            .catch(error => {
                console.error("Error creating fabric order:", error);
                throw error;  // Rethrow to ensure error handling continues in the calling context
            });
    },

    updateFabricOrder(orderId, fields) {
        const data = JSON.stringify(fields);

        const config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${BASE_URL}/fabric-order/${encodeURIComponent(orderId)}`,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getBearerToken()}`
            },
            data: data
        };

        return axios.request(config)
            .then(response => response.data)
            .catch(error => {
                console.error("Error updating fabric order:", error);
                throw error;  // Rethrow to ensure error handling continues in the calling context
            });
    },

    deleteFabricOrder(orderId) {
        const config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${BASE_URL}/fabric-order/${encodeURIComponent(orderId)}`,
            headers: {
                'Authorization': `Bearer ${getBearerToken()}`
            }
        };

        return axios.request(config)
            .then(response => response.data)
            .catch(error => {
                console.error("Error deleting fabric order:", error);
                throw error;  // Rethrow to ensure error handling continues in the calling context
            });
    }
}

export default fabricOrderService;
