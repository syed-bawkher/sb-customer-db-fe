import React from "react";
import { Card } from "antd";

const CustomerCard = ({
  fName,
  mName,
  lName,
  phOff,
  phRes,
  mobile,
  email,
  customer_id,
}) => {
    const fullName = [fName, mName, lName].filter(name => name).join(" ");
  return (
    <div className="sm:w-full bg-slate-800 md:p-2 rounded-lg shadow-sm hover:bg-slate-900">
      <div className="font-bold text-lg">
      {customer_id + ": " + (fullName || "Unnamed")}
      </div>
      <div className="flex justify-between">
        {phOff && (
          <div className="flex">
            <div className="hidden md:block">Office:</div>
            <div>{phOff}</div>
          </div>
        )}
        {phRes && (
          <div className="flex">
            <div className="hidden md:block">Residential:</div>
            <div>{phRes}</div>
          </div>
        )}
        {mobile && (
          <div className="flex">
            <div className="hidden md:block">Mobile:</div>
            <div>{mobile}</div>
          </div>
        )}
        {email && (
          <div className="flex">
            <div className="hidden md:block">Email:</div>
            <div>{email}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerCard;
