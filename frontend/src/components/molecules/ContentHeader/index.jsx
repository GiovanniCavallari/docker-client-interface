import React from 'react';
import Props from 'prop-types';
import { Button } from 'rsuite';
import { FaHistory } from 'react-icons/fa';

import './styles.less';

const ContentHeader = ({ title, children, onButtonClick, onRefreshClick, action = false, refresh = false }) => {
  return (
    <div className="di-title-container">
      <h3>{title}</h3>

      <div className="di-title-button-container">
        {refresh && (
          <Button appearance="ghost" onClick={onRefreshClick}>
            <FaHistory /> Refresh
          </Button>
        )}

        {action && (
          <Button color="blue" appearance="primary" onClick={onButtonClick}>
            {children}
          </Button>
        )}
      </div>
    </div>
  );
};

ContentHeader.propTypes = {
  title: Props.string.isRequired,
  children: Props.node.isRequired,
  action: Props.bool,
  refresh: Props.bool,
  onButtonClick: Props.func,
  onRefreshClick: Props.func,
};

export default ContentHeader;
