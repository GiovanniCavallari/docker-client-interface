import React, { useRef, useState } from 'react';
import { Content } from 'rsuite';
import { FaPlus } from 'react-icons/fa';
import { useFetch } from '../../hooks/useFetch';
import { fields, validation } from '../../configs/createContainer';

import Card from '../../components/atoms/Card';
import CardLoading from '../../components/molecules/CardLoading';
import ContentHeader from '../../components/molecules/ContentHeader';
import ModalForm from '../../components/organisms/ModalForm';
import Container from '../../components/organisms/Container';
import AdminTemplate from '../../components/templates/Admin';

import './styles.less';

const Containers = () => {
  const formRef = useRef();

  const { data, mutate } = useFetch('/containers');

  const [openModalForm, setOpenModalForm] = useState(false);
  const [formError, setFormError] = React.useState({});
  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleModalForm = () => {
    setOpenModalForm(!openModalForm);
  };

  const handleSubmit = () => {
    if (!formRef.current.check()) {
      console.error('Form Error: ', formError);
      return;
    }

    console.log('Form Value: ', formValue);
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
            formRef={formRef}
            open={openModalForm}
            title="Create new container"
            fields={fields}
            validation={validation}
            formValue={formValue}
            buttonText="Create"
            handleError={setFormError}
            handleClose={handleModalForm}
            handleSubmit={handleSubmit}
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
          formRef={formRef}
          open={openModalForm}
          title="Create new container"
          fields={fields}
          validation={validation}
          formValue={formValue}
          buttonText="Create"
          handleError={setFormError}
          handleClose={handleModalForm}
          handleSubmit={handleSubmit}
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
