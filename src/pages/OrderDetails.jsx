import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JacketCard from "../components/cards/JacketCard";
import PantCard from "../components/cards/PantCard";
import ShirtCard from "../components/cards/ShirtCard";
import orderService from "../services/orderService";
import ItemsTable from "../components/tables/ItemsTable";
import OrderPhotoCard from "../components/cards/OrderPhotoCard";

const OrderDetails = () => {
  const { orderNo } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await orderService.getOrder(orderNo);
        setOrder(data);
      } catch (error) {
        console.error("Failed to fetch order details:", error);
      }
    };
    fetchOrder();
  }, [orderNo])

  


  return (
    <>
      <div className="text-xl font-bold">{orderNo}</div>
      <div className="flex flex-row pt-10 space-x-5">
        <JacketCard orderNo={orderNo} />
        <PantCard orderNo={orderNo} />
        <ShirtCard orderNo={orderNo} />
      </div>
      <div className="pt-10">
        <div>Order Notes</div>
        <div>{order ? order.onote || "No additional notes" : "Loading notes..."}</div>
      </div>
      <div className="pt-2">
        <OrderPhotoCard orderNo={orderNo} />
      </div>
      <div className="pt-2">
        <ItemsTable orderNo={orderNo} />
      </div>
    </>
  );
};

export default OrderDetails;
