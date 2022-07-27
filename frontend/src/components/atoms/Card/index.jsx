import React from 'react';
import Props from 'prop-types';
import { Panel } from 'rsuite';

import './styles.less';

const Card = ({ children, title }) => {
  return (
    <Panel className="di-card" title={title} bordered>
      {children}
    </Panel>
  );
};

Card.propTypes = {
  title: Props.string,
  children: Props.node.isRequired,
};

export default Card;
