import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

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
    createJacketMeasurement: async (customerId, orderNo, measurementData) => {
        const url = `${BASE_URL}/jacketMeasurement/${encodeURIComponent(customerId)}/${encodeURIComponent(orderNo)}`;
        try {
            const response = await axios.post(url, measurementData);
            console.log('Jacket:', measurementData);
            return response.data;
        } catch (error) {
            console.error('Error creating jacket measurement:', error);
            throw error;
        }
    },
    updateJacketMeasurement: async (measurementId, measurementData) => {
        const url = `${BASE_URL}/jacketMeasurement/${encodeURIComponent(measurementId)}`;
        const data = JSON.stringify(measurementData);
        const config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: url,
            headers: { 
                'Content-Type': 'application/json'
            },
            data: data
        };
        try {
            const response = await axios.request(config);
            return response.data;
        } catch (error) {
            console.error('Error updating jacket measurement:', error);
            throw error;
        }
    }

}

export default jacketService;