import { Button, Col, Form, Row, Space } from "antd";
import FormFields from "../utils/FormFields";
import type { Field } from "../../types/Form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect } from "react";

interface Props {
  refreshTable: () => void;
}
const AdvancedSearchForm = ({ refreshTable }: Props) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [queryPararms, setQueryPararms] = useSearchParams();

  const itemsAdvanceSearch: Field[] = [
    {
      label: "ID",
      type: "input",
      rule: [
        {
          type: "string",
          message: "the field is number",
          pattern: new RegExp(/^[0-9]+$/),
        },
      ],
    },
    { label: "Role", type: "select" },
    { label: "Username", type: "input" },
  ];

  const onFinish = (values: any) => {
    let urlReplace = "../user?";
    Object.keys(values).map((key: string) => {
      if (values[key]) {
        urlReplace += `${key}=${values[key]}&`;
      }
    });

    navigate(urlReplace, { replace: true });

    setTimeout(() => {
      refreshTable();
    }, 100);
  };

  const resetForm = () => {
    form.resetFields();
    navigate("../user", { replace: true });
    setTimeout(() => {
      refreshTable();
    }, 100);
  };

  useEffect(() => {
    const params: any = {};
    queryPararms.forEach((value, key) => {
      params[key] = value;
    });
    form.setFieldsValue({
      ...params,
    });
  });

  return (
    <Form
      name="advance-form"
      onFinish={onFinish}
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      form={form}
    >
      <Row gutter={24}>
        <FormFields items={itemsAdvanceSearch} span={6} />
        <Col span={6} style={{ textAlign: "right" }}>
          <Space size="small">
            <Button type="primary" htmlType="submit">
              Search
            </Button>
            <Button onClick={resetForm}>Clear</Button>
          </Space>
        </Col>
      </Row>
    </Form>
  );
};

export default AdvancedSearchForm;
