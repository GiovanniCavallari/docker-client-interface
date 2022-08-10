import React from 'react';
import Props from 'prop-types';
import { Message as RsuiteMessage } from 'rsuite';

const Message = ({ children, className, closable = false, type = 'info' }) => {
  return (
    <RsuiteMessage showIcon closable={closable} type={type} className={className}>
      {children}
    </RsuiteMessage>
  );
};

Message.propTypes = {
  type: Props.oneOf(['info', 'success', 'warning', 'error']),
  closable: Props.bool,
  className: Props.string,
  children: Props.node.isRequired,
};

export default Message;
