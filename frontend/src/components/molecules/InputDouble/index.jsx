import React from 'react';
import Props from 'prop-types';
import { FlexboxGrid } from 'rsuite';

import Input from '../../atoms/Input';

const InputDouble = ({ first, second, onChange, className, separator, hasSeparator = false }) => {
  return (
    <FlexboxGrid className={className}>
      <FlexboxGrid.Item colspan={11} className="di-colspan-12">
        <Input name={first.name} value={first.value} label={first.label} onChange={onChange} />
      </FlexboxGrid.Item>

      {hasSeparator && (
        <FlexboxGrid.Item colspan={2} className="di-flex-centered di-top-32">
          {separator}
        </FlexboxGrid.Item>
      )}

      <FlexboxGrid.Item colspan={11} className="di-colspan-12">
        <Input name={second.name} value={second.value} label={second.label} onChange={onChange} />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

const inputProps = Props.shape({
  name: Props.string.isRequired,
  value: Props.oneOfType([Props.string, Props.number]).isRequired,
  label: Props.string,
});

InputDouble.propTypes = {
  first: inputProps.isRequired,
  second: inputProps.isRequired,
  onChange: Props.func.isRequired,
  className: Props.string,
  separator: Props.oneOfType([Props.string, Props.node]),
  hasSeparator: Props.bool,
};

export default InputDouble;
