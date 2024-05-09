import React, { useState } from "react";
import { Modal, Button, message, Steps, Form } from "antd";
import orderService from "../../services/orderService";
import jacketService from "../../services/jacketService";
import shirtService from "../../services/shirtService";
import pantService from "../../services/pantService";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";
import OrderDetailsForm from "../forms/OrderDetailsForm";
import AddMeasurementsForm from "../forms/AddMeasurementsForm";

const { Step } = Steps;

const CreateOrderModal = ({ isOpen, isCancel, customerid = null }) => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});

  //Array of steps for the order creation process
  const steps = [
    //Step 1: 'Order Details'
    {
      title: "Order Details",
      content: (
        <>
          <OrderDetailsForm
            form={form}
            formData={formData}
            setFormData={setFormData}
          />
        </>
      ),
    },
    //Step 2: 'Add Measurements'
    {
      title: "Add Measurements",
      content: (
        <>
          <AddMeasurementsForm
            form={form}
            formData={formData}
            setFormData={setFormData}
          />
        </>
      ),
    },
  ];

  const handleSubmit = async () => {
    try {
      // Triggering validation for all fields before submitting
      if (!formData.jacket && !formData.shirt && !formData.pant) {
        message.error("Please select at least one item to proceed.");
        return;
      }
      
      await form.validateFields();

      const finalValues = form.getFieldsValue(true);
      const { orderNo, date, note, jacket, shirt, pant } = finalValues;
      const formattedDate = date ? date.format("YYYY-MM-DD") : undefined;

      const orderResponse = await orderService.createOrder(customerid, {
        orderNo,
        date: formattedDate,
        note,
      });

      if (!orderResponse.orderNo) {
        throw new Error("Order number was not returned.");
      }

      const measurementPromises = [];
      if (jacket) {
        measurementPromises.push(
          jacketService.createJacketMeasurement(
            customerid,
            orderResponse.orderNo,
            jacket
          )
        );
      }
      if (shirt) {
        measurementPromises.push(
          shirtService.createShirtMeasurement(
            customerid,
            orderResponse.orderNo,
            shirt
          )
        );
      }
      if (pant) {
        measurementPromises.push(
          pantService.createPantMeasurement(
            customerid,
            orderResponse.orderNo,
            pant
          )
        );
      }

      await Promise.allSettled(measurementPromises);
      message.success("Order and all measurements created successfully!");
      form.resetFields();
      setFormData({});
      isCancel();
    } catch (error) {
      message.error("Failed to create order: " + error.message);
      console.error("Error in creating order or measurements: ", error);
    }
  };

  const handleNext = () => {
    const stepValidationFields = {
      0: ["orderNo", "date", "note"], // Fields to validate in the first step
      1: [], // Placeholder for the second step; specific fields based on checkboxes
    };

    // Add measurement fields based on checkboxes
    if (currentStep === 1) {
      if (formData.jacket) {
        stepValidationFields[1].push(
          ...[
            ["jacket", "jacket_length"],
            ["jacket", "natural_length"],
            ["jacket", "back_length"],
            // Add other jacket fields
          ]
        );
      }
      if (formData.shirt) {
        stepValidationFields[1].push(
          ...[
            ["shirt", "length"],
            ["shirt", "half_shoulder"],
            // Add other shirt fields
          ]
        );
      }
      if (formData.pant) {
        stepValidationFields[1].push(
          ...[
            ["pant", "length"],
            ["pant", "waist"],
            // Add other pant fields
          ]
        );
      }
    }

    form
      .validateFields(stepValidationFields[currentStep])
      .then(() => {
        setCurrentStep(currentStep + 1);
      })
      .catch((errorInfo) => {
        console.error("Validation Failed:", errorInfo);
        message.error(
          "Please fill all required fields correctly before proceeding."
        );
      });
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <Modal
      title="Create New Order"
      open={isOpen}
      onCancel={() => {
        setFormData({});
        isCancel();
      }}
      footer={null}
    >
      <Steps current={currentStep} className="mt-10 px-5">
        {steps.map((item, index) => (
          <Step key={index} title={item.title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[currentStep].content}</div>
      <div className="steps-action">
        {currentStep < steps.length - 1 && (
          <Button type="primary" onClick={handleNext}>
            Next
          </Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button type="primary" onClick={handleSubmit}>
            Done
          </Button>
        )}
        {currentStep > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={handlePrev}>
            Previous
          </Button>
        )}
      </div>
    </Modal>
  );
};

export default CreateOrderModal;
