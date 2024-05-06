import React from "react";
import FindCustomer from "../components/FindCustomer";
import CreateCustomerButton from "../components/CreateCustomerButton";
const HomePage = () => {
  return (
    <div>
      <h1 className="font-bold text-xl">Find Customer</h1>
      <div className="flex flex-row">
        <FindCustomer />
        <CreateCustomerButton />
      </div>
    </div>
  );
};

export default HomePage;
