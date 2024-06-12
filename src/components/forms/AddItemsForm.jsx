import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, AutoComplete } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import fabricService from "../../services/fabricService";

const { Option } = Select;

const AddItemsForm = ({ form, formData, setFormData, setVisibility }) => {

  const [fabrics, setFabrics] = useState([]);

  useEffect(() => {
    const fetchFabrics = async () => {
      try {
        const allFabrics = await fabricService.getAllFabrics();
        setFabrics(allFabrics);
      } catch (error) {
        console.error("Failed to fetch fabrics:", error);
      }
    };

    fetchFabrics();
  }, []);

  const getFabricOptions = () =>
    fabrics.map((fabric) => ({
      value: fabric.fabric_id,
      label: `${fabric.fabric_id} - ${fabric.fabric_name} (${fabric.fabric_brand})`,
    }));

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
                  key={`${field.key}-item_name`}
                  name={[field.name, "item_name"]}
                  rules={[{ required: true, message: "Missing item name" }]}
                  className="col-span-2"
                >
                  <Input placeholder="Enter item name" />
                </Form.Item>
                <Form.Item
                  {...field}
                  key={`${field.key}-item_type`}
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
                  key={`${field.key}-fabric_id`}
                  name={[field.name, "fabric_id"]}
                  rules={[{ required: true, message: "Missing fabric code" }]}
                  className="col-span-2"
                >
                  <AutoComplete
                    options={getFabricOptions()}
                    placeholder="Enter fabric code"
                    filterOption={(inputValue, option) =>
                      option.label.toLowerCase().includes(inputValue.toLowerCase())
                    }
                  />
                </Form.Item>
                {form.getFieldValue(["items", index, "item_type"]) ===
                  "jacket" && (
                  <Form.Item
                    {...field}
                    key={`${field.key}-lining_fabric_id`}
                    name={[field.name, "lining_fabric_id"]}
                    rules={[{ required: true, message: "Missing lining code" }]}
                    className="col-span-2"
                  >
                    <AutoComplete
                      options={getFabricOptions()}
                      placeholder="Enter lining code"
                      filterOption={(inputValue, option) =>
                        option.label.toLowerCase().includes(inputValue.toLowerCase())
                      }
                    />
                  </Form.Item>
                )}
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
