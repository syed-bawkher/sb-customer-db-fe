import React, { useState } from "react";
import { Input, Form, Button, message, DatePicker, Checkbox } from "antd";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";
import JacketForm from "./JacketForm";
import ShirtForm from "./ShirtForm";
import PantForm from "./PantForm";

const AddMeasurementsForm = ({ form, formData, setFormData }) => {
  const [showJacket, setShowJacket] = useState(false);
  const [showShirt, setShowShirt] = useState(true); // Default to true
  const [showPant, setShowPant] = useState(false);

  const handleCheckboxChange = (type, checked) => {
    // Calculate what the state will be after this change
    const isJacket = type === "jacket" ? checked : showJacket;
    const isShirt = type === "shirt" ? checked : showShirt;
    const isPant = type === "pant" ? checked : showPant;
  
    // Check if all would be false after this change
    if (!isJacket && !isShirt && !isPant) {
      message.error("At least one item must be selected.");
      return; // Prevent state update if this would uncheck all
    }
  
    // Update the appropriate state
    if (type === "jacket") setShowJacket(checked);
    if (type === "shirt") setShowShirt(checked);
    if (type === "pant") setShowPant(checked);
  };
  

  const requiredFieldRule = [
    { required: true, message: "This field is required." },
  ];

  return (
    <>
      <Form
        form={form}
        initialValues={formData}
        onValuesChange={(changedValues, allValues) => setFormData(allValues)}
      >
        <div className="mt-10 flex flex-row justify-center space-x-5 pb-5">
          <Checkbox
            checked={showJacket}
            onChange={(e) => handleCheckboxChange("jacket", e.target.checked)}
          >
            Jacket
          </Checkbox>
          <Checkbox
            checked={showShirt}
            onChange={(e) => handleCheckboxChange("shirt", e.target.checked)}
          >
            Shirt
          </Checkbox>
          <Checkbox
            checked={showPant}
            onChange={(e) => handleCheckboxChange("pant", e.target.checked)}
          >
            Pant
          </Checkbox>
        </div>
        {showJacket && (
          <>
            <JacketForm form={form} formData={formData} setFormData={setFormData}  isVisible={showJacket} requiredFieldRule={requiredFieldRule} />
          </>
        )}
        {showShirt && (
          <>
            <ShirtForm form={form} formData={formData} setFormData={setFormData} isVisible={showShirt} requiredFieldRule={requiredFieldRule} />
          </>
        )}
        {showPant && (
          <>
            <PantForm form={form} formData={formData} setFormData={setFormData} isVisible={showPant} requiredFieldRule={requiredFieldRule} />
          </>
        )}
      </Form>
    </>
  );
};

export default AddMeasurementsForm;
