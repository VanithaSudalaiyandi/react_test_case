import React from "react";
import { Modal } from "react-bootstrap";

const ModalAlert = ({ alertShow }) => {
  return (
    <Modal show size="sm" dialogClassName="custom-modal1">
      <Modal.Body>Added Successfully!</Modal.Body>
    </Modal>
  );
};

export default ModalAlert;
