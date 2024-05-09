import React, { useState } from "react";
import { Tooltip, Button } from 'antd';
import { IoMdCreate } from "react-icons/io";
import CreateOrderModal from "../modals/CreateOrderModal";

const CreateOrderButton = ({ customerId = null }) => {
    const [isCreateOrderModalVisible, setIsCreateOrderModalVisible] = useState(false);

    const handleCreateOrder = () => {
        setIsCreateOrderModalVisible(true);
    };

    return (
        <>
            <Tooltip title="Create Order">
                <Button
                    type="dashed"
                    shape="circle"
                    icon={<IoMdCreate />}
                    className="ml-2"
                    onClick={handleCreateOrder} // Attach the onClick event handler here
                />
            </Tooltip>
            {isCreateOrderModalVisible && (
                <CreateOrderModal
                    isOpen={isCreateOrderModalVisible}
                    isCancel={() => setIsCreateOrderModalVisible(false)}
                    customerid={customerId} // Pass customerId to the modal if needed
                />
            )}
        </>
    );
}

export default CreateOrderButton;
