import { useState } from "react";

const useSideMenuState = () => {
  const [isOpen, setIfOpen] = useState(false);

  const open = () => {
    setIfOpen(true);
  };

  const close = () => {
    setIfOpen(false);
  };

  const toggle = () => {
    setIfOpen(!isOpen);
  };

  return {
    open,
    close,
    toggle,
    isOpen,
  };
};

export { useSideMenuState };
