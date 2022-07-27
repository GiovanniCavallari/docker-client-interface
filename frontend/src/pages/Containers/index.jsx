import React from 'react';
import { Content } from 'rsuite';
import { FaPlus } from 'react-icons/fa';
import { useFetch } from '../../hooks/useFetch';

import Card from '../../components/atoms/Card';
import CardLoading from '../../components/molecules/CardLoading';
import ContentHeader from '../../components/molecules/ContentHeader';
import Container from '../../components/organisms/Container';
import AdminTemplate from '../../components/templates/Admin';

import './styles.less';

const Containers = () => {
  const { data, mutate } = useFetch('/containers');

  const onLogoClick = () => {};

  const onButtonClick = () => {};

  if (!data) {
    return (
      <AdminTemplate onLogoClick={onLogoClick}>
        <Content className="di-admin-content">
          <ContentHeader title="Containers" onButtonClick={onButtonClick} onRefreshClick={() => mutate()}>
            <FaPlus /> Create new container
          </ContentHeader>
          <CardLoading type="grid" />
        </Content>
      </AdminTemplate>
    );
  }

  return (
    <AdminTemplate onLogoClick={onLogoClick}>
      <Content className="di-admin-content">
        <ContentHeader title="Containers" onButtonClick={onButtonClick} onRefreshClick={() => mutate()}>
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
