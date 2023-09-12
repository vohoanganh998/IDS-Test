import { useState } from "react";

const useModal = (_visible?: boolean) => {
  const [visible, setVisible] = useState(() => (_visible ? true : false));

  const toggle = () => {
    setVisible((prev) => !prev);
  };

  const show = () => {
    setVisible(true);
  };

  const hide = () => {
    setVisible(false);
  };

  return { toggle, visible, show, hide };
};

export default useModal;
