import React, { useEffect, useState } from 'react';
import { Content } from 'rsuite';
import api from '../../services/api';

import ContentHeader from '../../components/molecules/ContentHeader';
import CreateContainerForm from '../../components/organisms/CreateContainerForm';
import AdminTemplate from '../../components/templates/Admin';

const CreateContainer = () => {
  const [containers, setContainers] = useState([]);

  useEffect(() => {
    api.get('/containers').then((response) => {
      const names = response.data.data.map((container) => container.names[0]);
      setContainers(names);
    });
  }, []);

  return (
    <AdminTemplate>
      <Content className="di-admin-content">
        <ContentHeader title="Create new container" />
        <CreateContainerForm containers={containers} />
      </Content>
    </AdminTemplate>
  );
};

export default CreateContainer;
