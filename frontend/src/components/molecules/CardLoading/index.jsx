import React from 'react';
import Props from 'prop-types';
import { Placeholder } from 'rsuite';
import Card from '../../atoms/Card';

import './styles.less';

const CardLoading = ({ type }) => {
  let children = <></>;

  switch (type) {
    case 'graph':
      children = <Placeholder.Graph active />;
      break;

    case 'grid':
      children = <Placeholder.Grid rows={3} columns={5} active />;
      break;

    default:
      children = <Placeholder.Paragraph rows={5} active />;
      break;
  }

  return <Card>{children}</Card>;
};

CardLoading.propTypes = {
  type: Props.oneOf(['default', 'grid', 'graph']),
};

export default CardLoading;
