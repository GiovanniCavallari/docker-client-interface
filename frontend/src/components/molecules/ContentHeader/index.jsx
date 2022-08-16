import React from 'react';
import Props from 'prop-types';
import { Button } from 'rsuite';
import { FaHistory } from 'react-icons/fa';

import './styles.less';

const ContentHeader = ({
  title,
  children,
  buttonColor,
  onButtonClick,
  onRefreshClick,
  action = false,
  refresh = false,
}) => {
  const color = buttonColor || 'blue';

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
          <Button color={color} appearance="primary" onClick={onButtonClick}>
            {children}
          </Button>
        )}
      </div>
    </div>
  );
};

ContentHeader.propTypes = {
  title: Props.string.isRequired,
  children: Props.node,
  action: Props.bool,
  refresh: Props.bool,
  buttonColor: Props.oneOf(['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']),
  onButtonClick: Props.func,
  onRefreshClick: Props.func,
};

export default ContentHeader;
