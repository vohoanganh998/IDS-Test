import ModalComponent from "../utils/ModalComponent";
import { ModalType } from "../../types/Modal";
import { Button, Form, Space, notification } from "antd";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../store";
import { setUser } from "../../store/slices/userSlice";
import { useMutation } from "react-query";
import { User } from "../../types/User";
import { deleteUser } from "../../services/mockapi";
import { NotificationType } from "../../types/Notification";

type Props = {
  modal: ModalType;
  refreshTable: () => void;
};

function ModalConfirm({ modal, refreshTable }: Props) {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const [api, contextHolder] = notification.useNotification();

  const { user } = useSelector((state: RootState) => state.userSlice);

  const openNotificationWithIcon = (type: NotificationType, mes: string) => {
    api[type]({
      message: mes,
    });
  };

  const { mutate, isLoading } = useMutation(
    (payload: User) => deleteUser(payload.id),
    {
      onSuccess: () => {
        openNotificationWithIcon("success", "Deleted  User successfully!");
        refreshTable();
        modal.hide();
      },
      onError: (error: { status: number; data: { mes: string } }) => {
        openNotificationWithIcon(
          "error",
          error.data.mes || `Deleted User failed!`
        );
      },
    }
  );

  useEffect(() => {
    if (!modal.visible) {
      form.resetFields();
      dispatch(setUser(null));
    }
  }, [modal.visible]);

  return (
    <>
      {user && (
        <>
          {contextHolder}
          <ModalComponent modal={modal} title="Confirm Delete">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              Do you want to delete "{user?.username}"
            </div>
            <div style={{ textAlign: "right" }}>
              <Space size="small">
                <Button
                  disabled={isLoading}
                  type="primary"
                  onClick={() => mutate(user)}
                >
                  Yes
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
            </div>
          </ModalComponent>
        </>
      )}
    </>
  );
}

export default ModalConfirm;
