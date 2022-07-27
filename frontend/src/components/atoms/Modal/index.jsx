import React from 'react';
import Props from 'prop-types';
import { Button, Modal as RsuiteModal } from 'rsuite';
import { GoAlert } from 'react-icons/go';

import './styles.less';

const Modal = ({ open, title, text, actionText, handleSuccess, handleClose }) => {
  return (
    <RsuiteModal role="alertdialog" backdrop="static" size="xs" open={open} onClose={handleClose}>
      <RsuiteModal.Header>
        <RsuiteModal.Title className="di-modal-title">
          <GoAlert />
          {title}
        </RsuiteModal.Title>
      </RsuiteModal.Header>

      <RsuiteModal.Body>{text}</RsuiteModal.Body>

      <RsuiteModal.Footer>
        <Button onClick={handleSuccess} appearance="primary">
          {actionText}
        </Button>
        <Button onClick={handleClose} appearance="subtle">
          Cancel
        </Button>
      </RsuiteModal.Footer>
    </RsuiteModal>
  );
};

Modal.propTypes = {
  open: Props.bool.isRequired,
  title: Props.string.isRequired,
  text: Props.oneOfType([Props.string, Props.node]).isRequired,
  actionText: Props.string.isRequired,
  handleClose: Props.func.isRequired,
  handleSuccess: Props.func.isRequired,
};

export default Modal;
