import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

// Function to get the bearer token from session storage
const getBearerToken = () => {
    return sessionStorage.getItem('bearer_token');
};

const supplierService = {
    // Get all suppliers
    getAllSuppliers() {
        const config = {
            method: 'get',
            url: `${BASE_URL}/suppliers`,
            headers: {
                'Authorization': `Bearer ${getBearerToken()}`
            }
        };

        return axios.request(config)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching suppliers:', error);
                throw error;
            });
    },

    // Get a supplier by ID
    getSupplierById(supplierId) {
        const config = {
            method: 'get',
            url: `${BASE_URL}/supplier/${encodeURIComponent(supplierId)}`,
            headers: {
                'Authorization': `Bearer ${getBearerToken()}`
            }
        };

        return axios.request(config)
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching supplier by ID:', error);
                throw error;
            });
    },

    // Create a new supplier
    createSupplier(supplier) {
        const data = JSON.stringify(supplier);
        const config = {
            method: 'post',
            url: `${BASE_URL}/supplier`,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getBearerToken()}`
            },
            data: data
        };

        return axios.request(config)
            .then(response => response.data)
            .catch(error => {
                console.error('Error creating supplier:', error);
                throw error;
            });
    },

    // Update an existing supplier
    updateSupplier(supplierId, fields) {
        const data = JSON.stringify(fields);
        const config = {
            method: 'put',
            url: `${BASE_URL}/supplier/${encodeURIComponent(supplierId)}`,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getBearerToken()}`
            },
            data: data
        };

        return axios.request(config)
            .then(response => response.data)
            .catch(error => {
                console.error('Error updating supplier:', error);
                throw error;
            });
    },

    // Delete a supplier
    deleteSupplier(supplierId) {
        const config = {
            method: 'delete',
            url: `${BASE_URL}/supplier/${encodeURIComponent(supplierId)}`,
            headers: {
                'Authorization': `Bearer ${getBearerToken()}`
            }
        };

        return axios.request(config)
            .then(response => response.data)
            .catch(error => {
                console.error('Error deleting supplier:', error);
                throw error;
            });
    }
}

export default supplierService;
