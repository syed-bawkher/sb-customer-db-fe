import React, { useState, useEffect } from 'react';
import { Table, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import fabricService from '../../services/fabricService';

const TextileTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const fabrics = await fabricService.getAllFabrics();
      setData(fabrics.map((fabric, index) => ({ ...fabric, key: index.toString() })));
    } catch (error) {
      console.error('Failed to fetch fabrics:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleView = (fabricId) => {
    navigate(`/fabric/${fabricId}`);
  };

  const columns = [
    {
      title: 'Fabric Id',
      dataIndex: 'fabric_id',
      fixed: 'left',
    },
    {
      title: 'Fabric Code',
      dataIndex: 'fabric_code',
    },
    {
      title: 'Description',
      dataIndex: 'description',
    },
    {
      title: 'Available Length',
      dataIndex: 'available_length',
    },
    {
      title: 'Brand',
      dataIndex: 'fabric_brand',
    },
    {
      title: 'Stock Location',
      dataIndex: 'stock_location',
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      fixed: 'right',
      render: (_, record) => (
        <span>
          <Button
            type="link"
            onClick={() => handleView(record.fabric_id)}
          >
            View
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Table
        bordered
        className='bg-white rounded-lg shadow-lg'
        scroll={{ x: 1300 }}
        dataSource={data}
        columns={columns}
        rowClassName="editable-row"
        loading={loading}
      />
    </div>
  );
};

export default TextileTable;
