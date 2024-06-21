import React from "react";
import ReactDOM from "react-dom";
function ModelWrapper({ toggleModal, open, children }) {
  if (!open) {
    return null;
  }

  const wrapperStyles = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(48, 61, 67, 0.55)",
    zIndex: 999,
  };

  const dialogStyles = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 999,
    border: "none",
    borderRadius: "10px",
  };
  return ReactDOM.createPortal(
    <>
      <div
        onClick={toggleModal}
        className='fixed top-0 left-0 right-0 bottom-0 bg-[#303d438c]'
        // style={wrapperStyles}
      />
      <dialog
        className='fixed top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 rounded-lg'
        // style={dialogStyles}
        open={open}>
        {children}
      </dialog>
    </>,
    document.getElementById("portal")
  );
}

export default ModelWrapper;
