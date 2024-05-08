import React, { useState } from "react";
import { Input, Form, Button, message, DatePicker, Checkbox } from "antd";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";

const AddMeasurementsForm = ({ form, formData, setFormData }) => {
  const [showJacket, setShowJacket] = useState(false);
  const [showShirt, setShowShirt] = useState(true); // Default to true
  const [showPant, setShowPant] = useState(false);

  const handleCheckboxChange = (type, checked) => {
    if (!checked && !showJacket && !showShirt && !showPant) {
      // Prevent unchecking if it's the last checked box
      message.error("At least one item must be selected.");
      return;
    }
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
            <div className="grid grid-flow-row-dense md:grid-cols-3 justify-items-end">
              <Form.Item
                name={["jacket", "jacket_length"]}
                label="Jacket Length"
                rules={showJacket ? requiredFieldRule : null}
              >
                <Input className="w-10" />
              </Form.Item>
              <Form.Item
                name={["jacket", "natural_length"]}
                label="Natural Length"
                rules={showJacket ? requiredFieldRule : null}
              >
                <Input className="w-10" />
              </Form.Item>
              <Form.Item
                name={["jacket", "back_length"]}
                label="Back Length"
                rules={showJacket ? requiredFieldRule : null}
              >
                <Input className="w-10" />
              </Form.Item>
              <Form.Item
                name={["jacket", "x_back"]}
                label="Cross Back"
                rules={showJacket ? requiredFieldRule : null}
              >
                <Input className="w-10" />
              </Form.Item>
              <Form.Item
                name={["jacket", "half_shoulder"]}
                label="Half Shoulder"
                rules={showJacket ? requiredFieldRule : null}
              >
                <Input className="w-10" />
              </Form.Item>
              <Form.Item
                name={["jacket", "to_sleeve"]}
                label="To Sleeve"
                rules={showJacket ? requiredFieldRule : null}
              >
                <Input className="w-10" />
              </Form.Item>
              <Form.Item
                name={["jacket", "chest"]}
                label="Chest"
                rules={showJacket ? requiredFieldRule : null}
              >
                <Input className="w-10" />
              </Form.Item>
              <Form.Item
                name={["jacket", "waist"]}
                label="Waist"
                rules={showJacket ? requiredFieldRule : null}
              >
                <Input className="w-10" />
              </Form.Item>
              <Form.Item
                name={["jacket", "collar"]}
                label="Collar"
                rules={showJacket ? requiredFieldRule : null}
              >
                <Input className="w-10" />
              </Form.Item>
            </div>
            <Form.Item
              name={["jacket", "other_notes"]}
              label="Jacket Notes"
              rules={showJacket ? requiredFieldRule : null}
            >
              <TextArea rows={2} />
            </Form.Item>
          </>
        )}
        {showShirt && (
          <>
            <div className="grid grid-flow-row-dense md:grid-cols-3 justify-items-end">
              <Form.Item
                name={["shirt", "length"]}
                label="Shirt Length"
                rules={showShirt ? requiredFieldRule : null}
              >
                <Input className="w-10" />
              </Form.Item>
              <Form.Item
                name={["shirt", "half_shoulder"]}
                label="Half Shoulder"
              >
                <Input className="w-10" />
              </Form.Item>
              <Form.Item
                name={["shirt", "to_sleeve"]}
                label="To Sleeve"
                rules={showShirt ? requiredFieldRule : null}
              >
                <Input className="w-10" />
              </Form.Item>
              <Form.Item
                name={["shirt", "chest"]}
                label="chest"
                rules={showShirt ? requiredFieldRule : null}
              >
                <Input className="w-10" />
              </Form.Item>
              <Form.Item
                name={["shirt", "waist"]}
                label="Waist"
                rules={showShirt ? requiredFieldRule : null}
              >
                <Input className="w-10" />
              </Form.Item>
              <Form.Item
                name={["shirt", "collar"]}
                label="Collar"
                rules={showShirt ? requiredFieldRule : null}
              >
                <Input className="w-10" />
              </Form.Item>
            </div>
            <div className="grid grid-flow-row-dense md:grid-cols-2 justify-items-end">
              <Form.Item
                name={["shirt", "waist_coat_length"]}
                label="Waist Coat Length"
                rules={showShirt ? requiredFieldRule : null}
              >
                <Input className="w-10" />
              </Form.Item>
              <Form.Item
                name={["shirt", "sherwani_length"]}
                label="Sherwani Length"
                rules={showShirt ? requiredFieldRule : null}
              >
                <Input className="w-10" />
              </Form.Item>
            </div>
            <Form.Item
              name={["shirt", "other_notes"]}
              label="Shirt Notes"
              rules={showShirt ? requiredFieldRule : null}
            >
              <TextArea rows={2} />
            </Form.Item>
          </>
        )}
        {showPant && (
          <>
            <div className="grid grid-flow-row-dense md:grid-cols-3 justify-items-end">
              <Form.Item
                name={["pant", "length"]}
                label="Pant Length"
                rules={showPant ? requiredFieldRule : null}
              >
                <Input className="w-10" />
              </Form.Item>
              <Form.Item
                name={["pant", "inseem"]}
                label="Pant Inseem"
                rules={showPant ? requiredFieldRule : null}
              >
                <Input className="w-10" />
              </Form.Item>
              <Form.Item
                name={["pant", "waist"]}
                label="Waist"
                rules={showPant ? requiredFieldRule : null}
              >
                <Input className="w-10" />
              </Form.Item>
              <Form.Item
                name={["pant", "hips"]}
                label="Hips"
                rules={showPant ? requiredFieldRule : null}
              >
                <Input className="w-10" />
              </Form.Item>
              <Form.Item
                name={["pant", "bottom"]}
                label="Bottom"
                rules={showPant ? requiredFieldRule : null}
              >
                <Input className="w-10" />
              </Form.Item>
              <Form.Item
                name={["pant", "knee"]}
                label="Knee"
                rules={showPant ? requiredFieldRule : null}
              >
                <Input className="w-10" />
              </Form.Item>
            </div>
            <Form.Item
              name={["pant", "other_notes"]}
              label="Pant Notes"
              rules={showPant ? requiredFieldRule : null}
            >
              <TextArea rows={2} />
            </Form.Item>
          </>
        )}
      </Form>
    </>
  );
};

export default AddMeasurementsForm;
