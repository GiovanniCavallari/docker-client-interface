import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Content } from 'rsuite';
import { FaPlus } from 'react-icons/fa';
import { useFetch } from '../../hooks/useFetch';
import { routes } from '../../enums/routes';

import Card from '../../components/atoms/Card';
import Message from '../../components/atoms/Message';
import CardLoading from '../../components/molecules/CardLoading';
import ContentHeader from '../../components/molecules/ContentHeader';
import Container from '../../components/organisms/Container';
import AdminTemplate from '../../components/templates/Admin';

import './styles.less';

const Containers = () => {
  const navigate = useNavigate();
  const { data, error, mutate } = useFetch('/containers');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCreateContainer = () => {
    navigate(routes.CREATE_CONTAINER);
  };

  const handleRefresh = () => {
    setErrorMessage('');
    mutate().then(() => setErrorMessage(error?.message || error?.response?.data?.message));
  };

  const Header = () => (
    <ContentHeader
      action
      refresh
      title="Containers"
      onRefreshClick={handleRefresh}
      onButtonClick={handleCreateContainer}
    >
      <FaPlus /> Create new container
    </ContentHeader>
  );

  const ErrorMessage = () => (
    <Message closable type="error" className="di-mb-24">
      {error?.message || error?.response?.data?.message}
    </Message>
  );

  if (!data) {
    return (
      <AdminTemplate>
        <Content className="di-admin-content">
          <Header />

          {errorMessage && <ErrorMessage />}
          {error && !errorMessage && <ErrorMessage />}

          <CardLoading type="grid" />
        </Content>
      </AdminTemplate>
    );
  }

  return (
    <AdminTemplate>
      <Content className="di-admin-content">
        <Header />
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
