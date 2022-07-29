import React from 'react';
import Props from 'prop-types';
import { Form, Button, Modal, Schema } from 'rsuite';

import './styles.less';

const ModalForm = ({ title, open, fields, validation, formValue, buttonText, handleSubmit, handleClose, handleFormChange }) => {
  return (
    <Modal open={open} onClose={handleClose} size="xs">
      <Form fluid onChange={handleFormChange} formValue={formValue} model={validation}>
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {fields.map((field) => (
            <Form.Group key={field.id} controlId={field.id}>
              <Form.ControlLabel>{field.label}</Form.ControlLabel>
              <Form.Control name={field.name} type={field.type} autoComplete={field.autoComplete} />
              <Form.HelpText>{field.helperText}</Form.HelpText>
            </Form.Group>
          ))}
        </Modal.Body>

        <Modal.Footer>
          <Button  appearance="primary" type="submit">
            {buttonText}
          </Button>

          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

ModalForm.propTypes = {
  open: Props.bool.isRequired,
  title: Props.string.isRequired,
  formValue: Props.object.isRequired,
  buttonText: Props.string.isRequired,
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
