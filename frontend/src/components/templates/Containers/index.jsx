import React from 'react';
import Props from 'prop-types';
import { Content } from 'rsuite';
import { FaPlus } from 'react-icons/fa';

import ContentHeader from '../../molecules/ContentHeader';
import AdminTemplate from '../Admin';

const ContainersTemplate = ({ children, handleRefresh, handleCreateContainer }) => {
  return (
    <AdminTemplate>
      <Content className="di-admin-content">
        <ContentHeader
          action
          refresh
          title="Containers"
          onRefreshClick={handleRefresh}
          onButtonClick={handleCreateContainer}
        >
          <FaPlus /> Create new container
        </ContentHeader>
        {children}
      </Content>
    </AdminTemplate>
  );
};

ContainersTemplate.propTypes = {
  children: Props.node.isRequired,
  handleRefresh: Props.func.isRequired,
  handleCreateContainer: Props.func.isRequired,
};

export default ContainersTemplate;
