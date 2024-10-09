import React, { useEffect, useState } from "react";
import fabricService from "../../services/fabricService";
import {
  InboxOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { message, Upload, Modal, Button } from "antd";
import FabricImage from "./FabricImage";
import { useNavigate } from "react-router-dom";
import EditTextileModal from "../modals/EditTextileModal";

const FabricCard = ({ fabric }) => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [fabricData, setFabricData] = useState(fabric);
  const { confirm } = Modal;

  const fetchImageUrl = async () => {
    try {
      const result = await fabricService.getFabricImageUrl(fabricData.fabric_id);
      setImageUrl(result.url);
    } catch (error) {
      console.error("Error fetching fabric image URL:", error);
    }
  };

  useEffect(() => {
    if (fabricData.image) {
      fetchImageUrl();
    }
  }, [fabricData.image, fabricData.fabric_id]);

  const handleImageUploadSuccess = () => {
    fetchImageUrl();
  };

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure you want to delete this Fabric?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: handleDelete,
    });
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await fabricService.deleteFabric(fabricData.fabric_id);
      message.success("Fabric deleted successfully.");
      navigate("/fabrics");
    } catch (error) {
      message.error("Failed to delete the fabric.");
    }
  };

  const handleFabricUpdate = (updatedFabric) => {
    setFabricData(updatedFabric);
  };

  return (
    <div className="flex flex-row bg-white shadow-lg rounded-lg p-4 justify-between">
      <div className="flex flex-col">
        <div className="flex flex-row space-x-5">
          <div className="flex flex-col space-y-0 mb-2">
            <div className="text-lg font-bold">{fabricData.fabric_code}</div>
            <div className="text-sm font-extrabold text-gray-400">{fabricData.description}</div>
          </div>
          <div onClick={() => setIsEditModalVisible(true)}>
            <EditOutlined className="text-blue-500 hover:text-blue-300 transition-colors" />
          </div>
          <div onClick={showDeleteConfirm}>
            <DeleteOutlined className="text-red-500 hover:text-red-300 transition-colors" />
          </div>
        </div>
        <div className="text-md mb-2">
          <strong>ID:</strong> {fabricData.fabric_id}
        </div>
        <div className="text-md mb-2">
          <strong>Available Length:</strong> {fabricData.available_length} meters
        </div>
        <div className="text-md mb-2">
          <strong>Brand:</strong> {fabricData.fabric_brand}
        </div>
        <div className="text-md mb-2">
          <strong>Stock Location:</strong> {fabricData.stock_location}
        </div>
        <div className="text-md mb-2">
          <strong>Barcode:</strong> {fabricData.barcode}
        </div>
      </div>
      <div className="text-md mb-2">
        <FabricImage
          fabricId={fabricData.fabric_id}
          imageUrl={imageUrl}
          onImageUploadSuccess={handleImageUploadSuccess}
        />
      </div>
      <EditTextileModal
        visible={isEditModalVisible}
        onClose={() => setIsEditModalVisible(false)}
        fabric={fabricData}
        onUpdate={handleFabricUpdate}
      />
    </div>
  );
};

export default FabricCard;
