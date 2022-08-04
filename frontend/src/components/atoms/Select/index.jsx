import React from 'react';
import Props from 'prop-types';
import { SelectPicker, TagPicker } from 'rsuite';

const Select = ({ label, value, placeholder, onChange, multipleOptions = false, items = [] }) => {
  const data = items.map((item) => ({
    label: item,
    value: item,
  }));

  const styles = { cursor: 'pointer' };

  return (
    <>
      <label>{label}</label>

      {multipleOptions ? (
        <TagPicker
          block
          data={data}
          value={value}
          style={styles}
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
          placeholder={placeholder}
          onChange={onChange}
          searchable={false}
        />
      )}
    </>
  );
};

Select.propTypes = {
  label: Props.string,
  value: Props.any,
  items: Props.arrayOf(Props.string).isRequired,
  placeholder: Props.string,
  multipleOptions: Props.bool,
  onChange: Props.func.isRequired,
};

export default Select;
