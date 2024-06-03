import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

const customerService = {
    
    searchCustomers: async (search) => {
        const url = `${BASE_URL}/customers/search?query=${encodeURIComponent(search)}`; // Correct variable name used
        try {
            const response = await axios.get(url);
            return response.data;
        } catch (error) {
            console.error('Error searching for customers:', error);
            throw error; // Throws error to be caught where the function is called
        }
    },

    findById: async (customer_id) => {
        const url = `${BASE_URL}/customer/${customer_id}`;
        try {
            const response = await axios.get(url);
            return response.data[0];
        } catch (error) {
            console.error('Error finding customer:', error);
            throw error;
        }
    },

    createCustomer: async (customer) => {
        const url = `${BASE_URL}/customer`;
        try {
            const response = await axios.post(url, customer);
            return response.data;
        } catch (error) {
            console.error('Error creating customer:', error);
            throw error;
        }
    },

    updateCustomer: async (customer_id, customerData) => {
        const url = `${BASE_URL}/customer/${customer_id}`;
        try {
            const response = await axios.put(url, customerData);
            return response.data;
        } catch (error) {
            console.error('Error updating customer:', error);
            throw error;  // Throws error to be caught where the function is called
        }
    },

    mergeCustomers: async (customerIds) => {
        const url = `${BASE_URL}/customers/merge`;
        const data = { customerIds };
        try {
            const response = await axios.post(url, data, {
                headers: { 
                    'Content-Type': 'application/json'
                },
                maxBodyLength: Infinity
            });
            return response.data;
        } catch (error) {
            console.error('Error merging customers:', error);
            throw error;
        }
    }


}

export default customerService;