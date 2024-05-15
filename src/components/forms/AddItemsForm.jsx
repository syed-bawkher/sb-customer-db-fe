import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const AddItemsForm = ({ form, formData, setFormData, setVisibility }) => {
  /* 
  
  TODO:
   
   This component has the following known bugs 
    * everytime this form is loaded up this error is thrown in the console: 
        Warning: Encountered two children with the same key, `0`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.

   */

        
  // Function to update visibility based on items
  const updateVisibility = (_, allValues) => {
    const items = allValues.items || [];
    setVisibility({
      displayJacketForm: items.some((item) => item.item_type === "jacket"),
      displayShirtForm: items.some((item) => item.item_type === "shirt"),
      displayPantForm: items.some((item) => item.item_type === "pant"),
    });
  };

  // Function to ensure items have unique keys
  const getUniqueKey = () => {
    return new Date().getTime() + Math.random().toString(16).slice(2);
  };

  return (
    <Form
      form={form}
      initialValues={formData}
      onValuesChange={updateVisibility}
      autoComplete="off"
      layout="vertical"
      className="mt-10"
    >
      <Form.List
        name="items"
        initialValue={[{ item_type: "jacket", key: getUniqueKey() }]} // Default to one item slot
        rules={[{ required: true, message: "At least one item is required" }]}
      >
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <div
                key={field.key}
                className="grid grid-cols-1 md:grid-cols-9 gap-5"
              >
                <div className="md:col-span-1 grid justify-items-center">
                  <MinusCircleOutlined
                    onClick={() => remove(field.name)}
                    className="text-red-500 cursor-pointer text-xl pb-5"
                  />
                </div>
                <Form.Item
                  {...field}
                  name={[field.name, "item_name"]}
                  rules={[{ required: true, message: "Missing item name" }]}
                  className="col-span-2"
                >
                  <Input placeholder="Enter item name" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, "item_type"]}
                  rules={[{ required: true, message: "Missing item type" }]}
                  className="col-span-2"
                >
                  <Select placeholder="Select an item type">
                    <Option value="jacket">Jacket</Option>
                    <Option value="shirt">Shirt</Option>
                    <Option value="pant">Pant</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, "fabric_name"]}
                  rules={[{ required: true, message: "Missing fabric name" }]}
                  className="col-span-2"
                >
                  <Input placeholder="Enter fabric name" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, "lining_name"]}
                  rules={[{ required: true, message: "Missing lining name" }]}
                  className="col-span-2"
                >
                  <Input placeholder="Enter lining name" />
                </Form.Item>
              </div>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() =>
                  add({ item_type: "jacket", key: getUniqueKey() })
                } // Default new items to "jacket"
                block
                icon={<PlusOutlined />}
              >
                Add Item
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default AddItemsForm;
