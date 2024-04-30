import React, { useState } from 'react'
import { Input, message, Spin } from 'antd';
import customerService from '../services/customerService';

const FindCustomer = () => {
    const { Search } = Input;
    const [loading, setLoading] = useState(false);

    const handleSearch = async (value) => {
        if (!value.trim()) return;
        setLoading(true); // Set loading to true when search starts
        try {
            const results = await customerService.searchCustomers(value);
            console.log('Search results:', results);
            // Handle results
        } catch (error) {
            console.error('Failed to fetch customers:', error);
            message.error('Failed to search for customers');
        } finally {
            setLoading(false); // Set loading to false when search is complete
        }
    };

    return (
        <Spin spinning={loading}>
            <Search
                placeholder="Search by Name or Phone Number"
                allowClear
                enterButton="Search"
                className='w-auto md:w-1/2 xl:w-1/3'
                onSearch={handleSearch}
            />
        </Spin>
    );
}

export default FindCustomer;