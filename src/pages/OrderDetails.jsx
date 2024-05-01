import React from "react";
import { useParams } from "react-router-dom";
import JacketCard from "../components/JacketCard";
import PantCard from "../components/PantCard";
import ShirtCard from "../components/ShirtCard";

const OrderDetails = () => {
  const { orderNo } = useParams();

  return (
    <>
      <div className="text-xl font-bold">{orderNo}</div>
      <div className="flex flex-wrap pt-10 space-x-5">
        <JacketCard orderNo={orderNo} />
        <PantCard orderNo={orderNo} />
        <ShirtCard orderNo={orderNo} />
      </div>
    </>
  );
};

export default OrderDetails;
