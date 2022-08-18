import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import { routes } from '../../enums/routes';

import Card from '../../components/atoms/Card';
import Message from '../../components/atoms/Message';
import CardLoading from '../../components/molecules/CardLoading';
import Container from '../../components/organisms/Container';
import ContainersTemplate from '../../components/templates/Containers';

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

  const ErrorMessage = () => (
    <Message closable type="error" className="di-mb-24">
      {error?.message || error?.response?.data?.message}
    </Message>
  );

  if (!data) {
    return (
      <ContainersTemplate handleRefresh={handleRefresh} handleCreateContainer={handleCreateContainer}>
        {errorMessage && <ErrorMessage />}
        {error && !errorMessage && <ErrorMessage />}
        <CardLoading type="grid" />
      </ContainersTemplate>
    );
  }

  return (
    <ContainersTemplate handleRefresh={handleRefresh} handleCreateContainer={handleCreateContainer}>
      {data.map((container, index) => (
        <Card key={index}>
          <Container container={container} />
        </Card>
      ))}
    </ContainersTemplate>
  );
};

export default Containers;
