import React from "react";
import { Input, Form } from "antd";
import TextArea from "antd/es/input/TextArea";

const JacketForm = ({
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
          name={["jacket", "jacket_length"]}
          label="Jacket Length"
          rules={isVisible ? requiredFieldRule : null}
        >
          <Input className="w-10" />
        </Form.Item>
        <Form.Item
          name={["jacket", "natural_length"]}
          label="Natural Length"
          rules={isVisible ? requiredFieldRule : null}
        >
          <Input className="w-10" />
        </Form.Item>
        <Form.Item
          name={["jacket", "back_length"]}
          label="Back Length"
          rules={isVisible ? requiredFieldRule : null}
        >
          <Input className="w-10" />
        </Form.Item>
        <Form.Item
          name={["jacket", "x_back"]}
          label="Cross Back"
          rules={isVisible ? requiredFieldRule : null}
        >
          <Input className="w-10" />
        </Form.Item>
        <Form.Item
          name={["jacket", "half_shoulder"]}
          label="Half Shoulder"
          rules={isVisible ? requiredFieldRule : null}
        >
          <Input className="w-10" />
        </Form.Item>
        <Form.Item
          name={["jacket", "to_sleeve"]}
          label="To Sleeve"
          rules={isVisible ? requiredFieldRule : null}
        >
          <Input className="w-10" />
        </Form.Item>
        <Form.Item
          name={["jacket", "chest"]}
          label="Chest"
          rules={isVisible ? requiredFieldRule : null}
        >
          <Input className="w-10" />
        </Form.Item>
        <Form.Item
          name={["jacket", "waist"]}
          label="Waist"
          rules={isVisible ? requiredFieldRule : null}
        >
          <Input className="w-10" />
        </Form.Item>
        <Form.Item
          name={["jacket", "collar"]}
          label="Collar"
          rules={isVisible ? requiredFieldRule : null}
        >
          <Input className="w-10" />
        </Form.Item>
      </div>
      <Form.Item
        name={["jacket", "other_notes"]}
        label="Jacket Notes"
        rules={isVisible ? requiredFieldRule : null}
      >
        <TextArea rows={2} />
      </Form.Item>
    </Form>
  );
};

export default JacketForm;
