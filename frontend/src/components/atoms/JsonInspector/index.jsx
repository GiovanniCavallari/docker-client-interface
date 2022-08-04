import React from 'react';
import Props from 'prop-types';
import { Inspector, chromeLight } from 'react-inspector';

const JsonInspector = ({ title, data }) => {
  return <Inspector expandLevel={3} name={title} theme={chromeLight} data={data} />;
};

JsonInspector.propTypes = {
  title: Props.string,
  data: Props.object.isRequired,
};

export default JsonInspector;
