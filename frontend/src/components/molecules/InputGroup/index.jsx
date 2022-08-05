import React from 'react';
import Props from 'prop-types';
import { FlexboxGrid } from 'rsuite';

import Input from '../../atoms/Input';

const InputGroup = ({ first, second, onChange, className, separator, hasSeparator = false }) => {
  const spacing = first.label || second.label ? 'di-top-32' : 'di-top-16';
  const firstStyle = first.uppercase ? { textTransform: 'uppercase' } : {};
  const secondStyle = second.uppercase ? { textTransform: 'uppercase' } : {};

  return (
    <FlexboxGrid className={className}>
      <FlexboxGrid.Item colspan={11} className="di-colspan-12">
        <Input name={first.name} value={first.value} label={first.label} onChange={onChange} style={firstStyle} />
      </FlexboxGrid.Item>

      {hasSeparator && (
        <FlexboxGrid.Item colspan={2} className={`di-flex-centered ${spacing}`}>
          {separator}
        </FlexboxGrid.Item>
      )}

      <FlexboxGrid.Item colspan={11} className="di-colspan-12">
        <Input name={second.name} value={second.value} label={second.label} onChange={onChange} style={secondStyle} />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

const inputProps = Props.shape({
  name: Props.string.isRequired,
  value: Props.oneOfType([Props.string, Props.number]).isRequired,
  label: Props.string,
  uppercase: Props.bool,
});

InputGroup.propTypes = {
  first: inputProps.isRequired,
  second: inputProps.isRequired,
  onChange: Props.func.isRequired,
  className: Props.string,
  separator: Props.oneOfType([Props.string, Props.node]),
  hasSeparator: Props.bool,
};

export default InputGroup;
