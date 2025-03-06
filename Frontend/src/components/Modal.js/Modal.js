import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";

const Overlay = styled.div `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div `
  background: #111;
  padding: 20px;
  border-radius: 10px;
  color: white;
  min-width: 300px;
  max-width: 400px;
  position: relative;
`;

const CloseButton = styled.button `
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
`;

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return ReactDOM.createPortal( <
        Overlay onClick = { onClose } >
        <
        ModalContent onClick = {
            (e) => e.stopPropagation() } >
        <
        CloseButton onClick = { onClose } > ✖ < /CloseButton> { children } <
        /ModalContent> <
        /Overlay>,
        document.getElementById("modal-root")
    );
};

export default Modal;