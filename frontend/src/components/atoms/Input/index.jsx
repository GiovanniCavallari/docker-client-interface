import React from 'react';
import Props from 'prop-types';
import { Input as RsuiteInput } from 'rsuite';

const Input = ({ label, value, name, style, error, placeholder, onChange }) => {
  const errorClass = error ? 'di-input-error' : '';

  return (
    <>
      <label>{label}</label>
      <RsuiteInput
        name={name}
        value={value}
        style={style}
        onChange={onChange}
        className={errorClass}
        placeholder={placeholder}
      />
    </>
  );
};

Input.propTypes = {
  name: Props.string,
  label: Props.string,
  style: Props.object,
  error: Props.bool,
  placeholder: Props.string,
  onChange: Props.func.isRequired,
  value: Props.oneOfType([Props.string, Props.number]).isRequired,
};

export default Input;
