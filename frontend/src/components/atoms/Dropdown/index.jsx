import React from 'react';
import Props from 'prop-types';
import { Dropdown as RsuiteDropdown } from 'rsuite';

import './styles.less';

const Dropdown = ({ items }) => {
  return (
    <RsuiteDropdown title="Actions" placement="bottomEnd" className="di-drowpdown">
      {items.map((item, index) => (
        <RsuiteDropdown.Item key={index} onClick={item.onClick}>
          {item.icon}
          {item.text}
        </RsuiteDropdown.Item>
      ))}
    </RsuiteDropdown>
  );
};

Dropdown.propTypes = {
  items: Props.arrayOf(
    Props.shape({
      icon: Props.node,
      text: Props.string.isRequired,
      onClick: Props.func.isRequired,
    }).isRequired,
  ),
};

export default Dropdown;
