import React from "react";
import { Form } from "antd";
import JacketForm from "./JacketForm";
import ShirtForm from "./ShirtForm";
import PantForm from "./PantForm";

const AddMeasurementsForm = ({ form, visibility, setFormData, formData }) => {
  const requiredFieldRule = [{ required: true, message: "This field is required." }];

  return (
    <Form
      form={form}
    >
      {visibility.displayJacketForm && (
        <JacketForm form={form} isVisible={true} requiredFieldRule={requiredFieldRule} formData={formData} setFormData={setFormData} />
      )}
      {visibility.displayShirtForm && (
        <ShirtForm form={form} isVisible={true} requiredFieldRule={requiredFieldRule} formData={formData} setFormData={setFormData}/>
      )}
      {visibility.displayPantForm && (
        <PantForm form={form} isVisible={true} requiredFieldRule={requiredFieldRule} formData={formData} setFormData={setFormData}/>
      )}
    </Form>
  );
};

export default AddMeasurementsForm;
