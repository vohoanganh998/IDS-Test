import { Modal } from "antd";
import { ModalType } from "../../types/Modal";
import type { ReactNode } from "react";

type Props = {
  modal: ModalType;
  children: ReactNode;
  title?: string;
};

const ModalComponent = ({ modal, children, title = "Modal" }: Props) => {
  return (
    <>
      <Modal
        forceRender
        title={title}
        centered
        open={modal.visible}
        footer={null}
        onCancel={() => modal.hide()}
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalComponent;
