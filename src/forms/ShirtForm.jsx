import React from "react";
import { Input, Form } from "antd";
import TextArea from "antd/es/input/TextArea";

const ShirtForm = ({
  form,
  formData,
  setFormData,
  isVisible,
  requiredFieldRule,
}) => {
  if (!isVisible) return null;

  return (
    <Form
      form={form}
      initialValues={formData}
      onValuesChange={(changedValues, allValues) => setFormData(allValues)}
    >
      <div className="grid grid-flow-row-dense md:grid-cols-3 justify-items-end">
        <Form.Item
          name={["shirt", "length"]}
          label="Shirt Length"
          rules={isVisible ? requiredFieldRule : null}
        >
          <Input className="w-10" />
        </Form.Item>
        <Form.Item name={["shirt", "half_shoulder"]} label="Half Shoulder">
          <Input className="w-10" />
        </Form.Item>
        <Form.Item
          name={["shirt", "to_sleeve"]}
          label="To Sleeve"
          rules={isVisible ? requiredFieldRule : null}
        >
          <Input className="w-10" />
        </Form.Item>
        <Form.Item
          name={["shirt", "chest"]}
          label="chest"
          rules={isVisible ? requiredFieldRule : null}
        >
          <Input className="w-10" />
        </Form.Item>
        <Form.Item
          name={["shirt", "waist"]}
          label="Waist"
          rules={isVisible ? requiredFieldRule : null}
        >
          <Input className="w-10" />
        </Form.Item>
        <Form.Item
          name={["shirt", "collar"]}
          label="Collar"
          rules={isVisible ? requiredFieldRule : null}
        >
          <Input className="w-10" />
        </Form.Item>
      </div>
      <div className="grid grid-flow-row-dense md:grid-cols-2 justify-items-end">
        <Form.Item
          name={["shirt", "waist_coat_length"]}
          label="Waist Coat Length"
          rules={isVisible ? requiredFieldRule : null}
        >
          <Input className="w-10" />
        </Form.Item>
        <Form.Item
          name={["shirt", "sherwani_length"]}
          label="Sherwani Length"
          rules={isVisible ? requiredFieldRule : null}
        >
          <Input className="w-10" />
        </Form.Item>
      </div>
      <Form.Item
        name={["shirt", "other_notes"]}
        label="Shirt Notes"
        rules={isVisible ? requiredFieldRule : null}
      >
        <TextArea rows={2} />
      </Form.Item>
    </Form>
  );
};

export default ShirtForm;
