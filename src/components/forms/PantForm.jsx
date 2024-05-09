import React from "react";
import { Input, Form } from "antd";
import TextArea from "antd/es/input/TextArea";

const PantForm = ({
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
          name={["pant", "length"]}
          label="Pant Length"
          rules={isVisible ? requiredFieldRule : null}
        >
          <Input className="w-10" />
        </Form.Item>
        <Form.Item
          name={["pant", "inseem"]}
          label="Pant Inseem"
          rules={isVisible ? requiredFieldRule : null}
        >
          <Input className="w-10" />
        </Form.Item>
        <Form.Item
          name={["pant", "waist"]}
          label="Waist"
          rules={isVisible ? requiredFieldRule : null}
        >
          <Input className="w-10" />
        </Form.Item>
        <Form.Item
          name={["pant", "hips"]}
          label="Hips"
          rules={isVisible ? requiredFieldRule : null}
        >
          <Input className="w-10" />
        </Form.Item>
        <Form.Item
          name={["pant", "bottom"]}
          label="Bottom"
          rules={isVisible ? requiredFieldRule : null}
        >
          <Input className="w-10" />
        </Form.Item>
        <Form.Item
          name={["pant", "knee"]}
          label="Knee"
          rules={isVisible ? requiredFieldRule : null}
        >
          <Input className="w-10" />
        </Form.Item>
      </div>
      <Form.Item
        name={["pant", "other_notes"]}
        label="Pant Notes"
        rules={isVisible ? requiredFieldRule : null}
      >
        <TextArea rows={2} />
      </Form.Item>
    </Form>
  );
};

export default PantForm;
