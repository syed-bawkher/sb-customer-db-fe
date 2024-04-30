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
    }
}

export default customerService;