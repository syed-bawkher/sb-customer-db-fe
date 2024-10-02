import React, { useEffect, useState } from "react";
import fabricService from "../../services/fabricService";
import FabricImage from "./FabricImage"; // Import the new component
import { useNavigate } from 'react-router-dom';

const FabricCard = ({ fabric }) => {
  const navigate = useNavigate();
  const [imageUrl, setImageUrl] = useState(null);

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

  return (
    <div className="flex flex-row bg-white shadow-lg rounded-lg p-4 justify-between">
      <div className="flex flex-col">
        <div className="text-lg font-bold mb-2">{fabric.description}</div>
        <div className="text-md mb-2">
          <strong>ID:</strong> {fabric.fabric_id}
        </div>
        <div className="text-md mb-2">
          <strong>Available Length:</strong> {fabric.available_length} meters
        </div>
        <div className="text-md mb-2">
          <strong>Supplier:</strong> {fabric.fabric_supplier}
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
