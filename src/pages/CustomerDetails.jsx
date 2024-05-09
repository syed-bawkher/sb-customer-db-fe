import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import customerService from "../services/customerService";
import OrderTable from "../components/tables/OrderTable";
import PastMeasurements from "../components/tables/PastMeasurements";
import CreateCustomerButton from "../components/buttons/CreateCustomerButton";
import CustomerDetailsCard from "../components/cards/CustomerDetailsCard";

const CustomerDetails = () => {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setCustomer(await customerService.findById(customerId));
      //console.log('Customer:', customer);
    };

    fetchData();
  }, [customerId]);

  if (!customer) {
    return <div>Loading...</div>; // or some other loading indicator or handling
  }

  const fullName = [
    customer.first_name,
    customer.middle_name,
    customer.last_name,
  ]
    .filter((name) => name && name !== "NULL") // Check for non-null and not "NULL"
    .map((name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()) // Capitalize names
    .join(" ");

  return (
    <>
      <div className="flex flex-row items-center">
        <h1 className="text-3xl font-semibold ">{`${
          customer.customer_id + ": " + fullName
        }`}</h1>
        <CreateCustomerButton customerId={customerId} />
      </div>
      <CustomerDetailsCard customer={customer} />
      <OrderTable customerId={customerId} />
      <PastMeasurements customerId={customerId} />
    </>
  );
};

export default CustomerDetails;
