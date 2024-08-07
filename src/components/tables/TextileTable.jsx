import React, { useState, useEffect } from 'react';
import { Table, Input, InputNumber, Popconfirm, Form, Typography, Button, DatePicker } from 'antd';
import moment from 'moment';
import fabricService from '../../services/fabricService';

const { Title } = Typography;

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  let inputNode;
  if (inputType === 'number') {
    inputNode = <InputNumber />;
  } else if (inputType === 'date') {
    inputNode = <DatePicker format="YYYY-MM-DD" />;
  } else {
    inputNode = <Input />;
  }

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const TextileTable = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState([]);
  const [editingKey, setEditingKey] = useState('');
  const [loading, setLoading] = useState(false);

  const isEditing = (record) => record.key === editingKey;

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

  const edit = (record) => {
    form.setFieldsValue({
      ...record,
      fabric_purchase_date: record.fabric_purchase_date ? moment(record.fabric_purchase_date, 'YYYY-MM-DD') : null,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      if (row.fabric_purchase_date) {
        row.fabric_purchase_date = row.fabric_purchase_date.format
          ? row.fabric_purchase_date.format('YYYY-MM-DD')
          : row.fabric_purchase_date;
      }
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');

        // Determine whether to create or update
        if (item.fabric_id.startsWith('New-')) {
          await fabricService.createFabric(row);
        } else {
          await fabricService.updateFabric(item.fabric_id, row);
        }
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const handleDelete = async (key) => {
    const newData = data.filter((item) => item.key !== key);
    const fabric = data.find((item) => item.key === key);

    setData(newData);

    // Delete fabric from the server
    try {
      await fabricService.deleteFabric(fabric.fabric_id);
    } catch (error) {
      console.error('Failed to delete fabric:', error);
    }
  };

  const handleAdd = async () => {
    const newData = {
      fabric_id: `New-${data.length + 1}`,
      fabric_code: '',
      fabric_name: '',
      fabric_location: '',
      fabric_length: '',
      fabric_supplier: '',
      fabric_brand: '',
      fabric_purchase_date: '',
      key: data.length.toString(),
    };
    setData([...data, newData]);
    edit(newData);
  };

  const columns = [
    {
      title: 'Fabric Code',
      dataIndex: 'fabric_id',
      editable: true,
      fixed: 'left',
    },
    {
      title: 'Fabric Book No',
      dataIndex: 'fabric_code',
      editable: true,
      fixed: 'left',
    },
    {
      title: 'Fabric Description',
      dataIndex: 'fabric_name',
      editable: true,
    },
    {
      title: 'Stock Location',
      dataIndex: 'fabric_location',
      editable: true,
    },
    {
      title: 'Avalaible Length',
      dataIndex: 'fabric_length',
      fixed: 'right',
      fixed: 'left',
      editable: true,
    },
    {
      title: 'Fabric Supplier',
      dataIndex: 'fabric_supplier',
      editable: true,
    },
    {
      title: 'Fabric Brand',
      dataIndex: 'fabric_brand',
      fixed: 'right',
      editable: true,
    },
    {
      title: 'Fabric Purchase Date',
      dataIndex: 'fabric_purchase_date',
      editable: true,
      render: (date) => (date ? moment(date).format('YYYY-MM-DD') : ''),
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      fixed: 'right',

      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Typography.Link
              disabled={editingKey !== ''}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>
            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => handleDelete(record.key)}
            >
              <a className='text-red-500 p-1'>Delete</a>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType:
          col.dataIndex === 'fabric_length'
            ? 'number'
            : col.dataIndex === 'fabric_purchase_date'
            ? 'date'
            : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Title level={2}>Textile Management</Title>
      <Button
        onClick={handleAdd}
        type="primary"
        style={{
          marginBottom: 16,
        }}
      >
        Add a fabric
      </Button>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        scroll={{
          x: 700,
        }}
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
        loading={loading}
      />
    </Form>
  );
};

export default TextileTable;