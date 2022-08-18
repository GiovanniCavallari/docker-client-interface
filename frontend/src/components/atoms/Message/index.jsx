import React from 'react';
import Props from 'prop-types';
import { Message as RsuiteMessage } from 'rsuite';

const Message = ({ children, className, onClose, duration = 2000, closable = false, type = 'info' }) => {
  return (
    <RsuiteMessage showIcon closable={closable} type={type} className={className} duration={duration} onClose={onClose}>
      {children}
    </RsuiteMessage>
  );
};

Message.propTypes = {
  type: Props.oneOf(['info', 'success', 'warning', 'error']),
  onClose: Props.func,
  closable: Props.bool,
  duration: Props.number,
  className: Props.string,
  children: Props.node.isRequired,
};

export default Message;
