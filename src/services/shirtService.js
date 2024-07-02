import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

// Function to get the bearer token from session storage
const getBearerToken = () => {
    return sessionStorage.getItem('bearer_token');
};

const shirtService = {
    getShirtByOrderNo: async (orderNo) => {
        const url = `${BASE_URL}/shirtMeasurement/order/${encodeURIComponent(orderNo)}`;
        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${getBearerToken()}`
                }
            });
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
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${getBearerToken()}`
                }
            });
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
            const response = await axios.post(url, measurementData, {
                headers: {
                    'Authorization': `Bearer ${getBearerToken()}`
                }
            });
            console.log('Shirt:', measurementData);
            return response.data;
        } catch (error) {
            console.error('Error creating shirt measurement:', error);
            throw error;
        }
    },
    updateShirtMeasurement: async (measurementId, measurementData) => {
        const url = `${BASE_URL}/shirtMeasurement/${encodeURIComponent(measurementId)}`;
        const data = JSON.stringify(measurementData);
        const config = {
            method: 'put',
            maxBodyLength: Infinity,
            url: url,
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getBearerToken()}`
            },
            data: data
        };
        try {
            const response = await axios.request(config);
            return response.data;
        } catch (error) {
            console.error('Error updating shirt measurement:', error);
            throw error;
        }
    }

}

export default shirtService;