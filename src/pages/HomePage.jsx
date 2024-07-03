import React from "react";
import FindCustomer from "../components/search/FindCustomer";
import CreateCustomerButton from "../components/buttons/CreateCustomerButton";
const HomePage = () => {
  return (
    <div className="flex justify-center mt-[80px]">
      <div className="flex flex-col">
        <h1 className="font-bold text-3xl">Find Customer</h1>
        <div className="flex flex-row pt-2">
          <div className="w-[500px]">
            <FindCustomer />
          </div>
          <CreateCustomerButton />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
