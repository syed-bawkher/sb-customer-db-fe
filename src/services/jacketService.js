import axios from "axios";

const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';

const jacketService = {
    getJacketByOrderNo: async (orderNo) => {
        const url = `${BASE_URL}/jacketMeasurement/order/${encodeURIComponent(orderNo)}`;
        try {
            const response = await axios.get(url);
            //console.log('Jacket1:' + orderNo, response.data);
            return response.data[0];
        } catch (error) {
            console.error('Error finding jacket measurements:', error);
            throw error;
        }
    },
    getJacketByCustomerId: async (customerId) => {
        const url = `${BASE_URL}/jacketMeasurement/customer/${encodeURIComponent(customerId)}`;
        try {
            const response = await axios.get(url);
            console.log('Jacket1:' + customerId, response.data);
            return response.data;
        } catch (error) {
            console.error('Error finding jacket measurements:', error);
            throw error;
        }
    },

}

export default jacketService;