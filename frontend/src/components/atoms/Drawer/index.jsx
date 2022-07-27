import React from 'react';
import Props from 'prop-types';
import { Button, Drawer as RsuiteDrawer } from 'rsuite';

import './styles.less';

const Drawer = ({ open, size, title, placement, children, onClose }) => {
  return (
    <RsuiteDrawer size={size} placement={placement} open={open} onClose={onClose}>
      <RsuiteDrawer.Header>
        <RsuiteDrawer.Title>{title}</RsuiteDrawer.Title>
        <RsuiteDrawer.Actions>
          <Button onClick={onClose} appearance="primary">
            Close
          </Button>
        </RsuiteDrawer.Actions>
      </RsuiteDrawer.Header>

      <RsuiteDrawer.Body>{children}</RsuiteDrawer.Body>
    </RsuiteDrawer>
  );
};

Drawer.propTypes = {
  open: Props.bool.isRequired,
  size: Props.string.isRequired,
  title: Props.string.isRequired,
  children: Props.node.isRequired,
  onClose: Props.func.isRequired,
  placement: Props.string.isRequired,
};

export default Drawer;
