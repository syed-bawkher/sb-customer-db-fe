import axios from "axios";

const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';

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

    // Find Customer by ID (Route: 'http://localhost:8080/customer/customer_id',)
    findById: async (customer_id) => {
        const url = `${BASE_URL}/customer/${customer_id}`;
        try {
            const response = await axios.get(url);
            return response.data[0];
        } catch (error) {
            console.error('Error finding customer:', error);
            throw error;
        }
    }

    
}

export default customerService;