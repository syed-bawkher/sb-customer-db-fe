import React, { useEffect, useState } from "react";
import fabricService from "../../services/fabricService";
import {
  InboxOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { message, Upload, Modal, Button } from "antd";
import FabricImage from "./FabricImage"; // Import the new component
import { useNavigate } from "react-router-dom";

const FabricCard = ({ fabric }) => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const { confirm } = Modal;

  const fetchImageUrl = async () => {
    try {
      const result = await fabricService.getFabricImageUrl(fabric.fabric_id);
      setImageUrl(result.url); // Assuming the response has a "url" field
    } catch (error) {
      console.error("Error fetching fabric image URL:", error);
    }
  };

  useEffect(() => {
    if (fabric.image) {
      fetchImageUrl();
    }
  }, [fabric.image, fabric.fabric_id]);

  const handleImageUploadSuccess = () => {
    fetchImageUrl(); // Re-fetch image URL after a successful upload
  };

  // Show a confirmation modal before deleting
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

  // Handle image deletion
  const handleDelete = async () => {
    try {
      setLoading(true);
      await fabricService.deleteFabric(fabric.fabric_id);
      message.success("fabric deleted successfully.");
      navigate("/fabrics"); // Redirect to the fabrics page after deletion
    } catch (error) {
      message.error("Failed to delete the fabric.");
    }
    //needs to refresh page to see the changes
  };

  return (
    <div className="flex flex-row bg-white shadow-lg rounded-lg p-4 justify-between">
      <div className="flex flex-col">
        <div className="flex flex-row space-x-5">
          <div className="flex flex-col space-y-0 mb-2">
            <div className="text-lg font-bold">{fabric.fabric_code}</div>
            <div className="text-sm font-extrabold text-gray-400">{fabric.description}</div>
          </div>
          <div onClick={showDeleteConfirm}>
            <DeleteOutlined className="text-red-500 hover:text-red-300 transition-colors" />
          </div>
        </div>
        <div className="text-md mb-2">
          <strong>ID:</strong> {fabric.fabric_id}
        </div>
        <div className="text-md mb-2">
          <strong>Available Length:</strong> {fabric.available_length} meters
        </div>
        <div className="text-md mb-2">
          <strong>Brand:</strong> {fabric.fabric_brand}
        </div>
        <div className="text-md mb-2">
          <strong>Stock Location:</strong> {fabric.stock_location}
        </div>
        <div className="text-md mb-2">
          <strong>Barcode:</strong> {fabric.barcode}
        </div>
      </div>
      <div className="text-md mb-2">
        <FabricImage
          fabricId={fabric.fabric_id}
          imageUrl={imageUrl}
          onImageUploadSuccess={handleImageUploadSuccess}
        />
      </div>
    </div>
  );
};

export default FabricCard;
