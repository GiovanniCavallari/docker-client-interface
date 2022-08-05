import React from 'react';
import Props from 'prop-types';
import { InputGroup as RsuiteInputGroup } from 'rsuite';

import Input from '../../atoms/Input';

const InputGroup = ({ separator, first, second, onChange, className }) => {
  const style = { textTransform: 'uppercase' };
  const firstStyle = first.uppercase ? style : {};
  const secondStyle = second.uppercase ? style : {};

  return (
    <RsuiteInputGroup className={className}>
      <Input value={first.value} name={first.name} onChange={onChange} style={firstStyle} />
      <RsuiteInputGroup.Addon>{separator}</RsuiteInputGroup.Addon>
      <Input value={second.value} name={second.name} onChange={onChange} style={secondStyle} />
    </RsuiteInputGroup>
  );
};

const inputProps = Props.shape({
  name: Props.string.isRequired,
  value: Props.oneOfType([Props.string, Props.number]).isRequired,
  uppercase: Props.bool,
});

InputGroup.propTypes = {
  first: inputProps.isRequired,
  second: inputProps.isRequired,
  onChange: Props.func.isRequired,
  separator: Props.oneOfType([Props.string, Props.node]).isRequired,
  className: Props.string,
};

export default InputGroup;
