import React from 'react';
import Props from 'prop-types';
import { FaHistory } from 'react-icons/fa';
import { Button } from 'rsuite';

import './styles.less';

const ContentHeader = ({ title, children, onButtonClick, onRefreshClick }) => {
  return (
    <div className="di-title-container">
      <h3>{title}</h3>

      <div className="di-title-button-container">
        <Button appearance="ghost" onClick={onRefreshClick}>
          <FaHistory /> Refresh
        </Button>

        <Button color="blue" appearance="primary" onClick={onButtonClick}>
          {children}
        </Button>
      </div>
    </div>
  );
};

ContentHeader.propTypes = {
  title: Props.string.isRequired,
  children: Props.node.isRequired,
  onButtonClick: Props.func.isRequired,
  onRefreshClick: Props.func.isRequired,
};

export default ContentHeader;
