import React from "react";
import { Button, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { ModalType } from "../../types/Modal";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { setUser } from "../../store/slices/userSlice";
import { User } from "../../types/User";

type Props = {
  modal: ModalType;
  modalConfirm: ModalType;
  list: User[];
};

const TableComponent = ({ modal, list = [], modalConfirm }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const setUserRecord = (record: User, isConfirmModal: boolean) => {
    dispatch(setUser({ ...record }));
    isConfirmModal ? modalConfirm.show() : modal.show();
  };
  const columns: ColumnsType<User> = [
    {
      title: "No",
      dataIndex: "key",
      rowScope: "row",
      align: "center",
    },
    {
      title: "ID",
      dataIndex: "id",
      align: "center",
    },
    {
      title: "Username",
      dataIndex: "username",
      align: "center",
    },
    {
      title: "Role",
      dataIndex: "role",
      align: "center",
    },
    {
      title: "",
      dataIndex: "action",
      align: "center",
      render: (_, record) => (
        <div style={{ display: "flex", justifyItems: "center", gap: "5px" }}>
          <Button onClick={() => setUserRecord(record, false)}>Edit</Button>
          <Button
            type="primary"
            danger
            onClick={() => setUserRecord(record, true)}
          >
            Remove
          </Button>
        </div>
      ),
      width: "10%",
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={list} bordered />
      {/* <ModalActionUser modal={modal} /> */}
    </>
  );
};

export default TableComponent;
