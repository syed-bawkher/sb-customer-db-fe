import React from 'react'
import { useParams } from 'react-router-dom';

const OrderDetails = () => {
    const { orderNo } = useParams();

  return (
    <div>Order: {orderNo}</div>
  )
}

export default OrderDetails