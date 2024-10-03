import React, { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, DatePicker, message, Select } from 'antd';
import fabricOrderService from '../../services/fabricOrderListService';
import supplierService from '../../services/supplierService'; // Import the supplier service
import moment from 'moment';

const { Option } = Select;

const AddFabricPurchaseOrderForm = ({ onSuccess, fabricId }) => {
  const [form] = Form.useForm();
  const [suppliers, setSuppliers] = useState([]);
  const [selectedSupplierId, setSelectedSupplierId] = useState(null); // State to hold selected supplier_id

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const supplierList = await supplierService.getAllSuppliers();
        setSuppliers(supplierList);
      } catch (error) {
        message.error('Failed to load suppliers: ' + error.message);
      }
    };

    fetchSuppliers();
  }, []);

  const onFinish = async (values) => {
    try {
      // Convert the ordered_date to the required format
      const formattedValues = {
        ...values,
        ordered_date: values.ordered_date.format('YYYY-MM-DD'),
        supplier_id: selectedSupplierId, // Include supplier_id in the form values
      };
      await fabricOrderService.createFabricOrder(formattedValues);
      message.success('Fabric Purchase Order created successfully');
      form.resetFields();
      if (onSuccess) {
        onSuccess(); // Close the modal on success
      }
    } catch (error) {
      message.error('Failed to create fabric order: ' + error.message);
    }
  };

  const handleSupplierChange = (value, option) => {
    setSelectedSupplierId(option.key); // Update the selected supplier_id
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        fabric_code: fabricId || '', // Pre-fill fabric_code if fabricId is provided
        ordered_date: moment(), // Set default value to today's date
      }}
    >
      <Form.Item
        label="Fabric Code"
        name="fabric_code"
        rules={[{ required: true, message: 'Please input the fabric code!' }]}
      >
        <Input 
          placeholder="Enter fabric code" 
          disabled={!!fabricId} 
          value={fabricId ? fabricId : undefined} // Set value as fabricId only if it is provided
        />
      </Form.Item>
      
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input the description!' }]}
      >
        <Input placeholder="Enter purchase order description" />
      </Form.Item>

      <Form.Item
        label="Supplier Name"
        name="supplier_name"
        rules={[{ required: true, message: 'Please select a supplier!' }]}
      >
        <Select
          placeholder="Select a supplier"
          onChange={handleSupplierChange}
        >
          {suppliers.map((supplier) => (
            <Option key={supplier.supplier_id} value={supplier.supplier_name}>
              {supplier.supplier_name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Meters"
        name="meters"
        rules={[{ required: true, message: 'Please input the number of meters!' }]}
      >
        <InputNumber min={0} placeholder="Enter meters" style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Ordered Date"
        name="ordered_date"
        rules={[{ required: true, message: 'Please select the ordered date!' }]}
      >
        <DatePicker style={{ width: '100%' }} />
      </Form.Item>

      <Form.Item
        label="Ordered For"
        name="ordered_for"
        rules={[{ required: true, message: 'Please input who the order is for!' }]}
      >
        <Input placeholder="Enter client name or purpose" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddFabricPurchaseOrderForm;
