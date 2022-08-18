import React, { useState } from 'react';
import { mutate as globalMutate } from 'swr';
import { useFetch } from '../../hooks/useFetch';
import useVolumeMessageStore from '../../store/useVolumesMessages';
import api from '../../services/api';

import Card from '../../components/atoms/Card';
import Message from '../../components/atoms/Message';
import CardLoading from '../../components/molecules/CardLoading';
import Volume from '../../components/organisms/Volume';
import VolumesTemplate from '../../components/templates/Volumes';

const Volumes = () => {
  const { messageType, message, setMessage, clearMessage } = useVolumeMessageStore((state) => ({
    message: state.message,
    messageType: state.type,
    setMessage: state.setMessage,
    clearMessage: state.clearMessage,
  }));

  const [openModal, setOpenModal] = useState(false);
  const { data, error, mutate } = useFetch('/volumes');

  const handleRefresh = () => {
    clearMessage();
    mutate().then(() => setMessage(error?.message || error?.response?.data?.message));
  };

  const handleModal = () => {
    clearMessage();
    setOpenModal(!openModal);
  };

  const handleMessageClose = () => {
    clearMessage();
  };

  const handlePruneVolumes = () => {
    clearMessage();

    api
      .post('/volumes/prune')
      .then(() => {
        globalMutate('/volumes');
        setMessage('Volumes successfully pruned', 'success');
      })
      .catch((error) => {
        setMessage(error?.message || error?.response?.data?.message);
      })
      .finally(() => {
        setOpenModal(false);
      });
  };

  const VolumesMessage = () => (
    <Message closable className="di-mb-24" duration={0} type={messageType} onClose={handleMessageClose}>
      {message || error?.response?.data?.message || error?.message}
    </Message>
  );

  if (!data) {
    return (
      <VolumesTemplate
        openModal={openModal}
        handleModal={handleModal}
        handleRefresh={handleRefresh}
        handlePruneVolumes={handlePruneVolumes}
      >
        {error && <VolumesMessage />}
        <CardLoading type="grid" />
      </VolumesTemplate>
    );
  }

  return (
    <VolumesTemplate
      openModal={openModal}
      handleModal={handleModal}
      handleRefresh={handleRefresh}
      handlePruneVolumes={handlePruneVolumes}
    >
      {message && <VolumesMessage />}
      <Card>
        {data.map((volume, index) => (
          <Volume key={index} volume={volume} />
        ))}
      </Card>
    </VolumesTemplate>
  );
};

export default Volumes;
