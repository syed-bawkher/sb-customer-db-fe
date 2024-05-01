import axios from "axios";

const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';

const pantService = {
    getPantByOrderNo: async (orderNo) => {
        const url = `${BASE_URL}/pantMeasurement/order/${encodeURIComponent(orderNo)}`;
        try {
            const response = await axios.get(url);
            //console.log('Pant1:' + orderNo, response.data);
            return response.data[0];
        } catch (error) {
            console.error('Error finding pant measurements:', error);
            throw error;
        }
    },
    getPantByCustomerId: async (customerId) => {
        const url = `${BASE_URL}/pantMeasurement/customer/${encodeURIComponent(customerId)}`;
        try {
            const response = await axios.get(url);
            console.log('Pant1:' + customerId, response.data);
            return response.data;
        } catch (error) {
            console.error('Error finding pant measurements:', error);
            throw error;
        }
    },

}

export default pantService;