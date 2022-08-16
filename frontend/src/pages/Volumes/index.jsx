import React, { useState } from 'react';
import { mutate as globalMutate } from 'swr';
import { Content } from 'rsuite';
import { FaTrashAlt } from 'react-icons/fa';
import { useFetch } from '../../hooks/useFetch';
import api from '../../services/api';

import Card from '../../components/atoms/Card';
import Modal from '../../components/atoms/Modal';
import Message from '../../components/atoms/Message';
import CardLoading from '../../components/molecules/CardLoading';
import ContentHeader from '../../components/molecules/ContentHeader';
import Volume from '../../components/organisms/Volume';
import AdminTemplate from '../../components/templates/Admin';

const Volumes = () => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('error');
  const [openModal, setOpenModal] = useState(false);

  const { data, error, mutate } = useFetch('/volumes');

  const handleClose = () => {
    if (messageType === 'success') {
      setMessage('');
    }
  };

  const handleRefresh = () => {
    setMessage('');
    setMessageType('error');
    mutate().then(() => setMessage(error?.message || error?.response?.data?.message));
  };

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const handlePruneVolumes = () => {
    setMessage('');

    api
      .post('/volumes/prune')
      .then(() => {
        globalMutate('/volumes');
        setMessageType('success');
        setMessage('Volumes successfully pruned');
      })
      .catch((error) => {
        setMessage(error?.message || error?.response?.data?.message);
      })
      .finally(() => {
        setOpenModal(false);
      });
  };

  const Header = () => (
    <ContentHeader
      action
      refresh
      title="Volumes"
      buttonColor="red"
      onButtonClick={handleModal}
      onRefreshClick={handleRefresh}
    >
      <FaTrashAlt /> Prune volumes
    </ContentHeader>
  );

  const PruneModal = () => (
    <Modal
      open={openModal}
      title="Prune volumes"
      actionText="Prune"
      handleClose={handleModal}
      handleSuccess={handlePruneVolumes}
      text={<p>Are you sure you want to prune all volumes?</p>}
    />
  );

  const VolumesMessage = () => (
    <Message closable className="di-mb-24" type={messageType} onClose={handleClose}>
      {error?.message || error?.response?.data?.message || message}
    </Message>
  );

  if (!data) {
    return (
      <AdminTemplate>
        <Content className="di-admin-content">
          <Header />

          {message && <VolumesMessage />}
          {error && !message && <VolumesMessage />}

          <CardLoading type="grid" />
        </Content>
        <PruneModal />
      </AdminTemplate>
    );
  }

  return (
    <AdminTemplate>
      <Content className="di-admin-content">
        <Header />
        {message && <VolumesMessage />}
        <Card>
          {data.map((volume, index) => (
            <Volume key={index} volume={volume} />
          ))}
        </Card>
      </Content>
      <PruneModal />
    </AdminTemplate>
  );
};

export default Volumes;
