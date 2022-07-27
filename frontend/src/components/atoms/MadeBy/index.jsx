import React from 'react';
import Props from 'prop-types';
import { FaHeart } from 'react-icons/fa';

import './styles.less';

const MadeBy = ({ name, href }) => {
  return (
    <div className="di-made-by-container">
      Made with <FaHeart /> by{' '}
      <a href={href} target="blank">
        {name}
      </a>{' '}
      © {new Date().getFullYear()} All rights reserved
    </div>
  );
};

MadeBy.propTypes = {
  name: Props.string.isRequired,
  href: Props.string.isRequired,
};

export default MadeBy;
