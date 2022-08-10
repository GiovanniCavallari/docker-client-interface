import React from 'react';
import Props from 'prop-types';
import { Loader as RsuiteLoader } from 'rsuite';

const Loader = ({ size, backdrop = false, center = false }) => {
  return <RsuiteLoader backdrop={backdrop} size={size} center={center} />;
};

Loader.propTypes = {
  center: Props.bool,
  backdrop: Props.bool,
  size: Props.oneOf(['lg', 'md', 'sm', 'xs']).isRequired,
};

export default Loader;
