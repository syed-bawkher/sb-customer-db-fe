import React , {useEffect} from "react";
import { Modal, Input, Form, Button, message } from "antd";
import customerService from "../services/customerService";

const CreateCustomerModal = ({ isOpen, isCancel, customerid = null }) => {
  const [form] = Form.useForm();


  useEffect(() => {
    if (customerid) {
      customerService.findById(customerid)
        .then(data => {
          // Assuming `data` is the customer object returned from the backend
          form.setFieldsValue({
            first_name: data.first_name,
            middle_name: data.middle_name,
            last_name: data.last_name,
            mobile: data.mobile,
            add1: data.add1,
            add2: data.add2,
            add3: data.add3,
            add4: data.add4,
            email: data.email,
            office_phone: data.office_phone,
            residential_phone: data.residential_phone
          });
        })
        .catch(error => {
          console.error('Failed to fetch customer:', error);
          message.error('Failed to load customer data.');
        });
    }
  }, [customerid, isOpen, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (customerid) {
        await customerService.updateCustomer(customerid, values);
        message.success('Customer updated successfully!');
      } else {
        await customerService.createCustomer(values);
        message.success('Customer created successfully!');
      }
      form.resetFields();
      isCancel(); // Close modal after successful submission
    } catch (error) {
      console.error('Failed to process customer:', error);
      message.error('Failed to process customer. Please check your input and try again.');
    }
  };

  return (
    <Modal
      title="Create Customer"
      open={isOpen}
      onCancel={isCancel}
      footer={[
        <Button key="back" onClick={isCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Submit
        </Button>,
      ]}
    >
      <Form form={form} >
        <div className="space-y-2 flex flex-col py-2">
          <h1 className="text-gray-600 text-lg">Name</h1>
          <Form.Item label="First Name" name="first_name" rules={[{ required: true, message: 'Please Enter First Name' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Middle Name" name="middle_name">
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" name="last_name" rules={[{ required: true, message: 'Please Enter Last Name' }]}>
            <Input />
          </Form.Item>
        </div>

        <div className="space-y-2 flex flex-col py-2">
          <h1 className="text-gray-600 text-lg">Contact</h1>
          <Form.Item label="Mobile Phone" name="mobile" rules={[{ required: true, message: 'Please Enter Mobile Number' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Office Phone" name="office_phone">
            <Input />
          </Form.Item>
          <Form.Item label="Residential Phone" name="residential_phone">
            <Input />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input />
          </Form.Item>
        </div>

        <div className="space-y-2 flex flex-col py-2">
          <h1 className="text-gray-600 text-lg">Address</h1>
          <Form.Item label="Line 1" name="add1" rules={[{ required: true, message: 'Please Enter Address Line 1' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="Line 2" name="add2">
            <Input />
          </Form.Item>
          <Form.Item label="Line 3" name="add3">
            <Input />
          </Form.Item>
          <Form.Item label="Line 4" name="add4">
            <Input />
          </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateCustomerModal;
