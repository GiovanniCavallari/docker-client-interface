import React from 'react';
import Props from 'prop-types';
import { Input as RsuiteInput } from 'rsuite';

const Input = ({ label, value, placeholder, onChange }) => {
  return (
    <>
      <label>{label}</label>
      <RsuiteInput placeholder={placeholder} value={value} onChange={onChange} />
    </>
  );
};

Input.propTypes = {
  label: Props.string,
  value: Props.oneOfType([Props.string, Props.number]).isRequired,
  placeholder: Props.string,
  onChange: Props.func.isRequired,
};

export default Input;
