import axios from "axios";

const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';

const orderService = {
    findByCustomerId: async (customer_id) => {
        const url = `${BASE_URL}/orders/customer/${customer_id}`;
        try {
            const response = await axios.get(url);
            console.log('Orders1:' + customer_id, response.data);
            return response.data;
        } catch (error) {
            console.error('Error finding orders:', error);
            throw error;
        }
    }
}

export default orderService;