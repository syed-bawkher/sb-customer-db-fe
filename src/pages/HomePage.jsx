import React from "react";
import FindCustomer from "../components/search/FindCustomer";
import CreateCustomerButton from "../components/buttons/CreateCustomerButton";
const HomePage = () => {
  return (
    <div>
      <h1 className="font-bold text-xl">Find Customer</h1>
      <div className="flex flex-row pl-2 pt-2">
        <div className="w-1/2">
          <FindCustomer />
        </div>
        <CreateCustomerButton />
      </div>
    </div>
  );
};

export default HomePage;
