import React, { useState } from 'react';
import { Content, Schema } from 'rsuite';
import { FaPlus } from 'react-icons/fa';
import { useFetch } from '../../hooks/useFetch';

import Card from '../../components/atoms/Card';
import CardLoading from '../../components/molecules/CardLoading';
import ContentHeader from '../../components/molecules/ContentHeader';
import Container from '../../components/organisms/Container';
import ModalForm from '../../components/organisms/ModalForm';
import AdminTemplate from '../../components/templates/Admin';

import './styles.less';

const Containers = () => {
  const [openModalForm, setOpenModalForm] = useState(false);
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: '',
  });

  const validation = Schema.Model({
    name: Schema.Types.StringType().isRequired('This field is required.'),
    email: Schema.Types.StringType()
    .isEmail('Please enter a valid email address.')
    .isRequired('This field is required.'),
    password: Schema.Types.StringType().isRequired('This field is required.'),
  });

  const fields = [
    {
      id: 'name',
      name: 'name',
      type: 'text',
      label: 'Username',
      helperText: 'Required',
    },
    {
      id: 'email',
      name: 'email',
      type: 'text',
      label: 'Email',
      helperText: 'Required',
    },
    {
      id: 'password',
      name: 'password',
      type: 'password',
      label: 'Password',
      helperText: 'Required',
      autoComplete: 'off',
    },
  ];

  const { data, mutate } = useFetch('/containers');

  const handleModalForm = () => {
    setOpenModalForm(!openModalForm);
  };

  const onLogoClick = () => {};

  if (!data) {
    return (
      <AdminTemplate onLogoClick={onLogoClick}>
        <Content className="di-admin-content">
          <ContentHeader title="Containers" onButtonClick={handleModalForm} onRefreshClick={() => mutate()}>
            <FaPlus /> Create new container
          </ContentHeader>

          <ModalForm
            open={openModalForm}
            title="Create new container"
            fields={fields}
            validation={validation}
            formValue={formValue}
            buttonText="Create"
            handleClose={handleModalForm}
            handleSubmit={handleModalForm}
            handleFormChange={setFormValue}
          />

          <CardLoading type="grid" />
        </Content>
      </AdminTemplate>
    );
  }

  return (
    <AdminTemplate onLogoClick={onLogoClick}>
      <Content className="di-admin-content">
        <ContentHeader title="Containers" onButtonClick={handleModalForm} onRefreshClick={() => mutate()}>
          <FaPlus /> Create new container
        </ContentHeader>

        <ModalForm
          open={openModalForm}
          title="Create new container"
          fields={fields}
          validation={validation}
          formValue={formValue}
          buttonText="Create"
          handleClose={handleModalForm}
          handleSubmit={handleModalForm}
          handleFormChange={setFormValue}
        />

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
