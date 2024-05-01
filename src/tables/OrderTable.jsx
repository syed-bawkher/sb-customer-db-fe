import React, { useEffect, useState } from 'react';
import orderService from '../services/orderService';
import { Table, Input} from 'antd';
import { FaSearch } from "react-icons/fa";
import moment from 'moment';

const OrderTable = ({ customerId }) => {
    const [orders, setOrders] = useState(null);
    const [setFilteredInfo] = useState({});

    const { Search } = Input; // Destructure Search from Input

    useEffect(() => {
        const fetchData = async () => {
            const fetchedOrders = await orderService.findByCustomerId(customerId);
            setOrders(fetchedOrders);
        };

        fetchData();
    }, [customerId]);

        // Custom search for the order number
        const getColumnSearchProps = (dataIndex) => ({
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Search
                        placeholder="Search order number"
                        value={selectedKeys[0]}
                        allowClear
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onSearch={() => handleSearch(selectedKeys, confirm, clearFilters)}
                        enterButton
                        style={{ width: 200, marginBottom: 8 }}
                    />
                </div>
            ),
            onFilter: (value, record) =>
                record[dataIndex]
                    ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
                    : '',
            filterIcon: filtered => <FaSearch style={{ color: filtered ? '#1890ff' : undefined }} />,
        });

    const handleSearch = (selectedKeys, confirm) => {
        confirm();
        setFilteredInfo({ searchText: selectedKeys[0] });
    };

        // Define columns for the Ant Design Table
        const columns = [
            {
                title: 'Order Number',
                dataIndex: 'orderNo',
                key: 'orderNo',
                ...getColumnSearchProps('orderNo'),  // Spread the search props into the column
            },
            {
                title: 'Date',
                dataIndex: 'date',
                key: 'date',
                sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),  // Sorting by Unix timestamp
                sortDirections: ['descend', 'ascend'],  // Default sorting directions
                render: text => moment(text).format('YYYY-MM-DD')
            },
            {
                title: 'Note',
                dataIndex: 'onote',
                key: 'onote',
                render: text => text || 'N/A'  // Show 'N/A' if note is null
            }
        ];

    if (!orders) {
        return <div className='pt-2'>Loading Table...</div>;
    }

    return (
        <div className='pt-2'>
            <h1 className='py-2 text-lg font-light'>Orders</h1>
            <Table className='shadow-lg rounded-lg bg-slate-300' dataSource={orders} columns={columns} rowKey="orderNo" />
        </div>
    );
}

export default OrderTable;
