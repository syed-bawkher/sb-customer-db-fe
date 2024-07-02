import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8080';

// Function to get the bearer token from session storage
const getBearerToken = () => {
    return sessionStorage.getItem('bearer_token');
};

const orderService = {
    findByCustomerId: async (customer_id) => {
        const url = `${BASE_URL}/orders/customer/${customer_id}`;
        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${getBearerToken()}`
                }
            });
            //console.log('Orders1:' + customer_id, response.data);
            return response.data;
        } catch (error) {
            console.error('Error finding orders:', error);
            throw error;
        }
    }, 

    getOrder: async (orderNo) => {
        const url = `${BASE_URL}/order/${encodeURIComponent(orderNo)}`;
        try {
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${getBearerToken()}`
                }
            });
            //console.log('Order'+ orderNo, response.data);
            return response.data[0];
        } catch (error) {
            console.error('Error finding order:', error);
            throw error;
        }
    }, 
    createOrder: async (customerId, orderDetails) => {
        const url = `${BASE_URL}/order/${customerId}`;
        try {
            const { orderNo, date, note } = orderDetails;
            console.log('Order:', orderDetails);
            const response = await axios.post(url, {
                orderNo,
                date,
                note
            }, {
                headers: {
                    'Authorization': `Bearer ${getBearerToken()}`
                }
            });
            return response.data;  // This will now include orderNo
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    },

    deleteOrder: async (orderNo) => {
        const url = `${BASE_URL}/order/${encodeURIComponent(orderNo)}`;
        try {
            const response = await axios.delete(url, {
                headers: {
                    'Authorization': `Bearer ${getBearerToken()}`
                }
            });
            console.log(`Order ${orderNo} deleted successfully.`);
            return response.data;
        } catch (error) {
            console.error(`Error deleting order ${orderNo}:`, error);
            throw error;
        }
    }
}

export default orderService;