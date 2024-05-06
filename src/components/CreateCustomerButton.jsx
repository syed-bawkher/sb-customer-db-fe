import React, { useState } from "react";
import { IoMdCreate } from "react-icons/io";
import { Button, Tooltip } from "antd";
import CreateCustomerModal from "../modals/CreateCustomerModal";

const CreateCustomerButton = () => {
  const [isCreateCustomerModalVisible, setIsCreateCustomerModalVisible] = useState(false);

  const handleCreateCustomer = () => {
    setIsCreateCustomerModalVisible(true);
  };

  return (
    <>
      <Tooltip title="Create Customer">
        <Button
          type="primary"
          shape="circle"
          icon={<IoMdCreate />}
          className="ml-2"
          onClick={handleCreateCustomer}
        />
      </Tooltip>
      <CreateCustomerModal
        isOpen={isCreateCustomerModalVisible}
        isCancel={() => setIsCreateCustomerModalVisible(false)}
      />
    </>
  );
};

export default CreateCustomerButton;
