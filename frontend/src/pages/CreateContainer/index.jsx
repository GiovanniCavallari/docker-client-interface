import React from 'react';
import { Content } from 'rsuite';

import Card from '../../components/atoms/Card';
import ContentHeader from '../../components/molecules/ContentHeader';
import AdminTemplate from '../../components/templates/Admin';

import './styles.less';

const CreateContainer = () => {
  return (
    <AdminTemplate>
      <Content className="di-admin-content">
        <ContentHeader title="Create new container" />

        <Card>hello world</Card>
      </Content>
    </AdminTemplate>
  );
};

export default CreateContainer;
