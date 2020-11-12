import React from 'react';

import { Modal, Button } from 'react-bootstrap';

import './ModalPop.scss';

const ModalPop = ({ deleteInvoiceHandler, closeModal, show, idInvoice }) => {
  return (
    <Modal show={show} onHide={closeModal} backdrop='static'>
      <Modal.Body className='modal__message'>
        <i className='far fa-question-circle' /> Are you sure want to delete
        this Invoice?
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='outline-warning'
          onClick={() => {
            deleteInvoiceHandler(idInvoice);
            closeModal();
          }}
        >
          Delete
        </Button>
        <Button variant='outline-warning' onClick={closeModal}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPop;
