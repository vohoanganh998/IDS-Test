import ModalComponent from "../utils/ModalComponent";
import { ModalType } from "../../types/Modal";
import { Button, Col, Form, Row, Space, notification } from "antd";
import { Field } from "../../types/Form";
import FormFields from "../utils/FormFields";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { setUser } from "../../store/slices/userSlice";
import { useMutation } from "react-query";
import { User } from "../../types/User";
// import { addUser, editUser } from "../../services/mockapi";
import { addUser, editUser } from "../../services/user.service";
import { NotificationType } from "../../types/Notification";

type Props = {
  modal: ModalType;
  refreshTable: () => void;
};

function ModalActionUser({ modal, refreshTable }: Props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const [api, contextHolder] = notification.useNotification();

  const { user } = useSelector((state: RootState) => state.userSlice);

  const openNotificationWithIcon = (type: NotificationType, mes: string) => {
    api[type]({
      message: mes,
    });
  };

  const itemsAdvanceSearch: Field[] = [
    {
      label: "ID",
      type: "input",
      disabled: !!user,
      rule: [
        () => ({
          validator(_, value) {
            const regx = new RegExp(/^[0-9]+$/);
            if (!value) {
              return Promise.reject(new Error("the field is require"));
            }
            if (value && !regx.test(value)) {
              return Promise.reject(new Error("the field is number"));
            }
            return Promise.resolve();
          },
        }),
      ],
    },
    {
      label: "Username",
      type: "input",
      rule: [
        {
          required: true,
          message: "the field is require",
        },
      ],
    },
    {
      label: "Password",
      type: "password",
      rule: [
        {
          required: true,
          message: "the field is require",
        },
      ],
    },
    {
      label: "Confirm",
      type: "password",
      rule: [
        {
          required: true,
          message: "Please confirm your password!",
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue("password") === value) {
              return Promise.resolve();
            }
            return Promise.reject(
              new Error("The new password that you entered do not match!")
            );
          },
        }),
      ],
    },
    {
      label: "Role",
      type: "select",
      rule: [
        {
          type: "string",
          required: true,
          message: "the field is require",
        },
      ],
    },
  ];

  const { mutate, isLoading } = useMutation(
    (payload: User) => {
      if (user) return editUser(payload);
      return addUser(payload);
    },
    {
      onSuccess: () => {
        openNotificationWithIcon(
          "success",
          `${user ? "Added" : "Edited"}  User successfully!`
        );
        refreshTable();
        modal.hide();
      },
      onError: (error: { status: number; data: { mes: string } }) => {
        openNotificationWithIcon(
          "error",
          error.data.mes || `${user ? "Add" : "Edit"} User failed!`
        );
      },
    }
  );

  const onFinish = (values: any) => {
    mutate(values);
  };

  useEffect(() => {
    if (!modal.visible) {
      form.resetFields();
      dispatch(setUser(null));
    } else {
      if (user) {
        form.setFieldsValue({
          ...user,
          confirm: user.password,
        });
      }
    }
  }, [modal.visible]);

  return (
    <>
      {contextHolder}
      <ModalComponent modal={modal} title={user ? "Edit User" : "Add User"}>
        <Form
          name="action-form"
          onFinish={onFinish}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          form={form}
        >
          <Row gutter={24}>
            <FormFields items={itemsAdvanceSearch} span={24} />
            <Col span={24} style={{ textAlign: "right" }}>
              <Space size="small">
                <Button disabled={isLoading} type="primary" htmlType="submit">
                  Save
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    modal.hide();
                  }}
                  danger
                >
                  Cancel
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </ModalComponent>
    </>
  );
}

export default ModalActionUser;
