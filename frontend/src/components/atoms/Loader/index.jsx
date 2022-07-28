import React from 'react';
import Props from 'prop-types';
import { Loader as RsuiteLoader } from 'rsuite';

const Loader = ({ size, center = false }) => {
  return <RsuiteLoader size={size} center={center} />;
};

Loader.propTypes = {
  center: Props.bool,
  size: Props.oneOf(['lg', 'md', 'sm', 'xs']).isRequired,
};

export default Loader;
