import React, { useState } from "react";
import { Modal, Button, message, Steps, Form } from "antd";
import orderService from "../../services/orderService";
import itemsService from "../../services/itemsService";
import jacketService from "../../services/jacketService";
import shirtService from "../../services/shirtService";
import pantService from "../../services/pantService";
import moment from "moment";
import OrderDetailsForm from "../forms/OrderDetailsForm";
import AddMeasurementsForm from "../forms/AddMeasurementsForm";
import AddItemsForm from "../forms/AddItemsForm";

const { Step } = Steps;

const CreateOrderModal = ({ isOpen, isCancel, customerid = null }) => {
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [visibility, setVisibility] = useState({
    displayJacketForm: false,
    displayShirtForm: false,
    displayPantForm: false,
  });

  //Array of steps for the order creation process
  const steps = [
    //Step 1: 'Order Details'
    {
      title: "Order Details",
      content: (
        <OrderDetailsForm
          form={form}
          formData={formData}
          setFormData={setFormData}
        />
      ),
    },
    {
      title: "Add Items",
      content: (
        <AddItemsForm
          form={form}
          formData={formData}
          setFormData={setFormData}
          setVisibility={setVisibility}
        />
      ),
    },
    //Step 2: 'Add Measurements'
    {
      title: "Add Measurements",
      content: <AddMeasurementsForm form={form} visibility={visibility} formData={formData} setFormData={setFormData}/>,
    },
  ];

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      const { orderNo, date, note, items } = form.getFieldsValue(true);
      const formattedDate = date
        ? date.format("YYYY-MM-DD")
        : moment().format("YYYY-MM-DD");

      const orderResponse = await orderService.createOrder(customerid, {
        orderNo,
        date: formattedDate,
        note,
      });

      if (!orderResponse.orderNo)
        throw new Error("Order number was not returned.");

      const measurementPromises = items.map((item) => {
        switch (item.item_type) {
          case "jacket":
            return jacketService.createJacketMeasurement(
              customerid,
              orderResponse.orderNo,
              item
            );
          case "shirt":
            return shirtService.createShirtMeasurement(
              customerid,
              orderResponse.orderNo,
              item
            );
          case "pant":
            return pantService.createPantMeasurement(
              customerid,
              orderResponse.orderNo,
              item
            );
          default:
            throw new Error("Unsupported item type");
        }
      });

      const measurementResults = await Promise.allSettled(measurementPromises);
      console.log("Measurement results:", measurementResults);

      const itemsWithMeasurements = items
        .map((item, index) => {
          const result = measurementResults[index];
          if (
            result.status === "fulfilled" &&
            result.value &&
            result.value.measurement_id
          ) {
            return {
              ...item,
              measurement_id: result.value.measurement_id,
              orderNo: orderResponse.orderNo,
            };
          }
          return null; // Perhaps log or handle this situation where a measurement failed to create
        })
        .filter((item) => item !== null);

      if (itemsWithMeasurements.length !== items.length) {
        console.log("Mismatch in item measurements", itemsWithMeasurements);
        throw new Error(
          "Some items failed to have measurements created properly."
        );
      }

      await itemsService.createMultipleItems(
        orderResponse.orderNo,
        itemsWithMeasurements
      );

      message.success("Order, measurements, and items created successfully!");
      form.resetFields();
      setFormData({});
      isCancel(); // Close modal or clear form
    } catch (error) {
      message.error(`Failed to create order and items: ${error.message}`);
      console.error("Error in creating order, measurements, or items: ", error);
    }
  };

  const handleNext = () => {
    form
      .validateFields()
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
      width="auto"
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
