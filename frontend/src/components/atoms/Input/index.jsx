import React from 'react';
import Props from 'prop-types';
import { Input as RsuiteInput } from 'rsuite';

const Input = ({ label, value, name, style, placeholder, onChange }) => {
  return (
    <>
      <label>{label}</label>
      <RsuiteInput placeholder={placeholder} value={value} name={name} onChange={onChange} style={style} />
    </>
  );
};

Input.propTypes = {
  name: Props.string,
  label: Props.string,
  style: Props.object,
  placeholder: Props.string,
  onChange: Props.func.isRequired,
  value: Props.oneOfType([Props.string, Props.number]).isRequired,
};

export default Input;
