import React from 'react';
import { Modal, Input, Form, Button, message, DatePicker } from 'antd';
import orderService from '../services/orderService';
import moment from 'moment'; 

const CreateOrderModal = ({ isOpen, isCancel, customerid = null }) => {
  const [form] = Form.useForm();

  // Function to handle form submission
  const handleFormSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formattedDate = values.date ? values.date.format('YYYY-MM-DD') : undefined; // Format the date here
  
      const response = await orderService.createOrder(customerid, {
        orderNo: values.orderNo,
        date: formattedDate, // Pass the formatted date
        note: values.note
      });
  
      message.success('Order created successfully');
      form.resetFields();  // Reset form after successful submission
      isCancel();          // Close modal after successful operation
    } catch (error) {
      message.error('Failed to create order: ' + error.message);
    }
  };

  return (
    <Modal
      title="Create New Order"
      open={isOpen}
      onCancel={() => {
        form.resetFields();  // Ensure form is cleared when the modal is cancelled
        isCancel();
      }}
      footer={[
        <Button key="back" onClick={isCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleFormSubmit}>
          Create Order
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="orderNo"
          label="Order Number"
          rules={[{ required: true, message: 'Please enter an order number' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="date"
          label="Date (optional)"
          tooltip="If no date is provided, today's date will be used."
        >
          <DatePicker />
        </Form.Item>
        <Form.Item
          name="note"
          label="Note"
          tooltip="Any special notes for the order"
        >
          <Input.TextArea rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateOrderModal;
