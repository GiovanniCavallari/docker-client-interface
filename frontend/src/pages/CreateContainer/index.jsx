import React from 'react';
import { Content } from 'rsuite';
import { FaPlus } from 'react-icons/fa';

import ContentHeader from '../../components/molecules/ContentHeader';
import AdminTemplate from '../../components/templates/Admin';

import './styles.less';

const CreateContainer = () => {
  return (
    <AdminTemplate>
      <Content className="di-admin-content">
        <ContentHeader title="Create new container" onButtonClick={() => {}} onRefreshClick={() => {}}>
          <FaPlus /> Create new container
        </ContentHeader>
      </Content>
    </AdminTemplate>
  );
};

export default CreateContainer;
