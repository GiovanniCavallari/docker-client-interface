import React from 'react';
import Props from 'prop-types';
import { Nav, Sidenav } from 'rsuite';

import './styles.less';

const VerticalMenu = ({ items }) => {
  return (
    <Sidenav className="di-vertical-menu-container">
      <Sidenav.Body>
        <Nav activeKey="1" className="di-vertical-menu-nav">
          {items.map((item, index) => (
            <Nav.Item
              key={index}
              eventKey={index}
              icon={item.icon}
              onClick={item.onClick}
              className="di-vertical-menu-item"
            >
              {item.text}
            </Nav.Item>
          ))}
        </Nav>
      </Sidenav.Body>
    </Sidenav>
  );
};

VerticalMenu.propTypes = {
  items: Props.arrayOf(
    Props.shape({
      text: Props.string.isRequired,
      icon: Props.node.isRequired,
      onClick: Props.func.isRequired,
    }).isRequired,
  ),
};

export default VerticalMenu;
