import React from 'react';
import Props from 'prop-types';
import { Form, SelectPicker, TagPicker } from 'rsuite';

const Select = ({ label, value, placeholder, onChange, error = false, multipleOptions = false, items = [] }) => {
  const data = items.map((item) => ({
    label: item,
    value: item,
  }));

  const styles = { cursor: 'pointer' };
  const errorClass = error ? 'di-select-error' : '';

  return (
    <>
      <label>{label}</label>

      {multipleOptions ? (
        <TagPicker
          block
          data={data}
          value={value}
          style={styles}
          className={errorClass}
          placeholder={placeholder}
          onChange={onChange}
          searchable={false}
        />
      ) : (
        <SelectPicker
          block
          data={data}
          value={value}
          style={styles}
          className={errorClass}
          placeholder={placeholder}
          onChange={onChange}
          searchable={false}
        />
      )}

      {error && <Form.HelpText className="di-input-helper">Required field</Form.HelpText>}
    </>
  );
};

Select.propTypes = {
  label: Props.string,
  value: Props.any,
  error: Props.bool,
  items: Props.arrayOf(Props.string).isRequired,
  placeholder: Props.string,
  multipleOptions: Props.bool,
  onChange: Props.func.isRequired,
};

export default Select;
