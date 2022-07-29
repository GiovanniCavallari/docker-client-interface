import React from 'react';
import Props from 'prop-types';
import { Form, Button, Modal, Schema } from 'rsuite';

import './styles.less';

const ModalForm = ({
  open,
  title,
  fields,
  formRef,
  formValue,
  buttonText,
  validation,
  handleError,
  handleClose,
  handleSubmit,
  handleFormChange,
}) => (
  <Modal open={open} onClose={handleClose} size="xs">
    <Modal.Header>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      <Form fluid ref={formRef} formValue={formValue} model={validation} onCheck={handleError} onChange={handleFormChange}>
        {fields.map((field) => (
          <Form.Group key={field.id} controlId={field.id}>
            <Form.ControlLabel>{field.label}</Form.ControlLabel>
            <Form.Control name={field.name} type={field.type} autoComplete={field.autoComplete} />
            <Form.HelpText>{field.helperText}</Form.HelpText>
          </Form.Group>
        ))}
      </Form>
    </Modal.Body>

    <Modal.Footer>
      <Button appearance="primary" onClick={handleSubmit}>
        {buttonText}
      </Button>

      <Button onClick={handleClose} appearance="subtle">
        Cancel
      </Button>
    </Modal.Footer>
  </Modal>
);

ModalForm.propTypes = {
  formRef: Props.any.isRequired,
  open: Props.bool.isRequired,
  title: Props.string.isRequired,
  formValue: Props.object.isRequired,
  buttonText: Props.string.isRequired,
  handleError: Props.func.isRequired,
  handleClose: Props.func.isRequired,
  handleSubmit: Props.func.isRequired,
  handleFormChange: Props.func.isRequired,
  validation: Props.any.isRequired,
  fields: Props.arrayOf(
    Props.shape({
      id: Props.string.isRequired,
      name: Props.string.isRequired,
      label: Props.string.isRequired,
      helperText: Props.string,
    }),
  ).isRequired,
};

export default ModalForm;
