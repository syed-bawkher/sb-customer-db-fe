import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

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
    createPantMeasurement: async (customerId, orderNo, measurementData) => {
        const url = `${BASE_URL}/pantMeasurement/${encodeURIComponent(customerId)}/${encodeURIComponent(orderNo)}`;
        try {
            const response = await axios.post(url, measurementData);
            console.log('Pant:', measurementData);
            return response.data;
        } catch (error) {
            console.error('Error creating pant measurement:', error);
            throw error;
        }
    },
    updatePantMeasurement: async (measurementId, measurementData) => {
        const url = `${BASE_URL}/pantMeasurement/${encodeURIComponent(measurementId)}`;
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
            console.error('Error updating pant measurement:', error);
            throw error;
        }
    }

}

export default pantService;