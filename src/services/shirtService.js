import axios from "axios";

const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';

const shirtService = {
    getShirtByOrderNo: async (orderNo) => {
        const url = `${BASE_URL}/shirtMeasurement/order/${encodeURIComponent(orderNo)}`;
        try {
            const response = await axios.get(url);
            //console.log('Shirt1:' + orderNo, response.data);
            return response.data[0];
        } catch (error) {
            console.error('Error finding shirt measurements:', error);
            throw error;
        }
    },
    getShirtByCustomerId: async (customerId) => {
        const url = `${BASE_URL}/shirtMeasurement/customer/${encodeURIComponent(customerId)}`;
        try {
            const response = await axios.get(url);
            console.log('Shirt1:' + customerId, response.data);
            return response.data;
        } catch (error) {
            console.error('Error finding shirt measurements:', error);
            throw error;
        }
    },
    createShirtMeasurement: async (customerId, orderNo, measurementData) => {
        const url = `${BASE_URL}/shirtMeasurement/${encodeURIComponent(customerId)}/${encodeURIComponent(orderNo)}`;
        try {
            const response = await axios.post(url, measurementData);
            console.log('Shirt:', measurementData);
            return response.data;
        } catch (error) {
            console.error('Error creating shirt measurement:', error);
            throw error;
        }
    }

}

export default shirtService;