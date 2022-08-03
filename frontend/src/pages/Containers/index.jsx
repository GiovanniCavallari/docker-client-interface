import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Content } from 'rsuite';
import { FaPlus } from 'react-icons/fa';
import { useFetch } from '../../hooks/useFetch';
import { routes } from '../../enums/routes';

import Card from '../../components/atoms/Card';
import CardLoading from '../../components/molecules/CardLoading';
import ContentHeader from '../../components/molecules/ContentHeader';
import Container from '../../components/organisms/Container';
import AdminTemplate from '../../components/templates/Admin';

import './styles.less';

const Containers = () => {
  const navigate = useNavigate();
  const { data, mutate } = useFetch('/containers');

  const handleCreateContainer = () => {
    navigate(routes.CREATE_CONTAINER);
  };

  if (!data) {
    return (
      <AdminTemplate>
        <Content className="di-admin-content">
          <ContentHeader refresh title="Containers" onButtonClick={handleCreateContainer} onRefreshClick={() => mutate()}>
            <FaPlus /> Create new container
          </ContentHeader>

          <CardLoading type="grid" />
        </Content>
      </AdminTemplate>
    );
  }

  return (
    <AdminTemplate>
      <Content className="di-admin-content">
        <ContentHeader refresh title="Containers" onButtonClick={handleCreateContainer} onRefreshClick={() => mutate()}>
          <FaPlus /> Create new container
        </ContentHeader>

        {data.map((container, index) => (
          <Card key={index}>
            <Container container={container} />
          </Card>
        ))}
      </Content>
    </AdminTemplate>
  );
};

export default Containers;
