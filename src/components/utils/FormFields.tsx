import { Col, Form, Input, Select } from "antd";
import { Field } from "../../types/Form";

const { Option } = Select;

type Props = {
  items: Field[];
  span?: number;
};

const FormFields = ({ items, span = 6 }: Props) => {
  const getFieldType = (item: Field) => {
    switch (item.type) {
      case "select":
        return (
          <Select placeholder={"Please select " + item.label.toLowerCase()}>
            <Option value="admin">Admin</Option>
            <Option value="manager">Manager</Option>
          </Select>
        );
      case "password":
        return (
          <Input.Password
            placeholder={"Please input " + item.label.toLowerCase()}
          />
        );

      default:
        return (
          <Input
            disabled={item.disabled}
            placeholder={"Please input " + item.label.toLowerCase()}
          />
        );
    }
  };
  const getFields = () => {
    const children = [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      children.push(
        <Col span={span} key={i}>
          <Form.Item label={item.label}>
            <Form.Item
              name={item.label.toLowerCase()}
              noStyle
              rules={item.rule || []}
            >
              {getFieldType(item)}
            </Form.Item>
          </Form.Item>
        </Col>
      );
    }
    return <>{children}</>;
  };

  return getFields();
};

export default FormFields;
