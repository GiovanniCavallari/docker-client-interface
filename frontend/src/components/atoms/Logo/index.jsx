import React from 'react';
import Props from 'prop-types';

import './styles.less';

const Logo = ({ src, alt, onClick }) => {
  return (
    <a className="di-logo" onClick={onClick}>
      <img src={src} alt={alt} />
    </a>
  );
};

Logo.propTypes = {
  src: Props.string.isRequired,
  alt: Props.string.isRequired,
  onClick: Props.func.isRequired,
};

export default Logo;
