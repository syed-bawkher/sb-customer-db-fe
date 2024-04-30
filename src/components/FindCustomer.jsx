import React, { useState } from 'react'
import { Input, message, Spin } from 'antd';
import customerService from '../services/customerService';
import CustomerCard from './CustomerCard';
import CustomerList from './CustomerList';

const FindCustomer = () => {
    const { Search } = Input;
    const [loading, setLoading] = useState(false);
    const [customers, setCustomers] = useState([]);

    const handleSearch = async (value) => {
        if (!value.trim()) return;
        setLoading(true);
        try {
            const results = await customerService.searchCustomers(value);
            console.log('Search results:', results);
            setCustomers(results); // Set search results to state
        } catch (error) {
            console.error('Failed to fetch customers:', error);
            message.error('Failed to search for customers');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Spin spinning={loading}>
            <Search
                placeholder="Search by Name or Phone Number"
                allowClear
                enterButton="Search"
                className='w-full md:w-1/2 xl:w-1/3'
                onSearch={handleSearch}
            />
            <CustomerList customers={customers} />
        </Spin>
    );
}

export default FindCustomer;