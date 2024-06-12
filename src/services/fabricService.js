import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

const fabricService = {
    getAllFabrics() {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${BASE_URL}/fabrics`,
            headers: {}
        };

        return axios.request(config)
            .then(response => response.data)
            .catch(error => {
                console.error("Error fetching fabrics:", error);
                throw error;  // Rethrow to ensure error handling continues in the calling context
            });
    },

    getFabricById(fabricId) {
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `${BASE_URL}/fabric/${encodeURIComponent(fabricId)}`,
            headers: {}
        };

        return axios.request(config)
            .then(response => response.data)
            .catch(error => {
                console.error("Error fetching fabric by ID:", error);
                throw error;  // Rethrow to ensure error handling continues in the calling context
            });
    },

    createFabric(fabric) {
        const data = JSON.stringify(fabric);

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${BASE_URL}/fabric`,
            headers: { 
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)
            .then(response => response.data)
            .catch(error => {
                console.error("Error creating fabric:", error);
                throw error;  // Rethrow to ensure error handling continues in the calling context
            });
    },

    updateFabric(fabricId, fields) {
        const data = JSON.stringify(fields);

        const config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: `${BASE_URL}/fabric/${encodeURIComponent(fabricId)}`,
            headers: { 
                'Content-Type': 'application/json'
            },
            data: data
        };

        return axios.request(config)
            .then(response => response.data)
            .catch(error => {
                console.error("Error updating fabric:", error);
                throw error;  // Rethrow to ensure error handling continues in the calling context
            });
    },

    deleteFabric(fabricId) {
        const config = {
            method: 'delete',
            maxBodyLength: Infinity,
            url: `${BASE_URL}/fabric/${encodeURIComponent(fabricId)}`,
            headers: {}
        };

        return axios.request(config)
            .then(response => response.data)
            .catch(error => {
                console.error("Error deleting fabric:", error);
                throw error;  // Rethrow to ensure error handling continues in the calling context
            });
    }
}

export default fabricService;
