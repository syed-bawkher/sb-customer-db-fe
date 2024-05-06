import React from "react";
import { Modal, Input, Form } from "antd";

const CreateCustomerModal = ({ isOpen, isCancel }) => {
  return (
    <Modal
      title="Create Customer"
      open={isOpen} // Use the 'open' prop for visibility
      onCancel={isCancel}
    >
      <Form>
        <div className="space-y-2 flex flex-col py-2">
          <h1 className = "text-gray-600 text-lg">Name</h1>
          <Form.Item label="First Name" name="fName" rules ={[{required:true, message: 'Please Enter First Name'}]}>
            <Input />
          </Form.Item>
          <Form.Item label="Middle Name" name="mName">
            <Input />
          </Form.Item>
          <Form.Item label="Last Name" name="lName" rules ={[{required:true, message: 'Please Enter Last Name'}]}>
            <Input />
          </Form.Item>
        </div>

        <div className="space-y-2 flex flex-col py-2">
          <h1 className = "text-gray-600 text-lg">Contact</h1>
            <Form.Item label="Mobile Phone" name="mobile" rules ={[{required:true, message: 'Please Enter Mobile Number'}]}>
                <Input />
            </Form.Item>
            <Form.Item label="Office Phone" name="phOff">
                <Input />
            </Form.Item>
            <Form.Item label="Residential Phone" name="phRes">
                <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
                <Input />
            </Form.Item>
        </div>

        <div className="space-y-2 flex flex-col py-2">
          <h1 className = "text-gray-600 text-lg">Address</h1>
            <Form.Item label="Address Line 1" name="add1" rules ={[{required:true, message: 'Please Enter Address Line 1'}]}>
                <Input />
            </Form.Item>
            <Form.Item label="Address Line 2" name="add2">
                <Input />
            </Form.Item>
            <Form.Item label="Address Line 3" name="add3">
                <Input />
            </Form.Item>
            <Form.Item label="Address Line 4" name="add4">
                <Input />
            </Form.Item>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateCustomerModal;
