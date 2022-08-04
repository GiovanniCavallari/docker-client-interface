import React, { useState } from 'react';
import Props from 'prop-types';
import { mutate as globalMutate } from 'swr';
import { FaPlay, FaStop, FaTrashAlt, FaInfoCircle, FaReceipt } from 'react-icons/fa';
import api from '../../../services/api';

import Modal from '../../atoms/Modal';
import Drawer from '../../atoms/Drawer';
import Loader from '../../atoms/Loader';
import JsonInspector from '../../atoms/JsonInspector';
import ContainerItem from '../../molecules/ContainerItem';

const Container = ({ container }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  const [logs, setLogs] = useState('');
  const [loadingLogs, setLoadingLogs] = useState(false);
  const [openLogs, setOpenLogs] = useState(false);

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const handleSuccessModal = () => {
    api.post(`/containers/${container.id}/down`).then(() => {
      globalMutate('/containers');
      setOpenModal(false);
    });
  };

  const handleDetails = () => {
    setOpenDetails(!openDetails);
  };

  const handleLogs = () => {
    setOpenLogs(!openLogs);
  };

  const handleLogRequest = () => {
    handleLogs();
    setLoadingLogs(true);

    api.get(`/containers/${container.id}/logs`).then((response) => {
      setLogs(response.data.data);
      setLoadingLogs(false);
    });
  };

  const handleStartContainer = () => {
    api.post(`/containers/${container.id}/start`).then(() => {
      globalMutate('/containers');
    });
  };

  const handleStopContainer = () => {
    api.post(`/containers/${container.id}/stop`).then(() => {
      globalMutate('/containers');
    });
  };

  const dropdowmItems = [
    {
      text: 'Details',
      icon: <FaInfoCircle />,
      onClick: handleDetails,
    },
    {
      text: 'Logs',
      icon: <FaReceipt />,
      onClick: handleLogRequest,
    },
    {
      text: 'Start',
      icon: <FaPlay />,
      onClick: handleStartContainer,
    },
    {
      text: 'Stop',
      icon: <FaStop />,
      onClick: handleStopContainer,
    },
    {
      text: 'Remove',
      icon: <FaTrashAlt />,
      onClick: handleModal,
    },
  ];

  return (
    <>
      <ContainerItem container={container} dropdowmItems={dropdowmItems} />

      <Drawer
        size="lg"
        open={openDetails}
        placement="bottom"
        onClose={handleDetails}
        title={`Details from container ${container.names[0]}`}
      >
        <JsonInspector title={container.names[0]} data={container} />
      </Drawer>

      <Drawer
        size="lg"
        open={openLogs}
        placement="bottom"
        onClose={handleLogs}
        title={`Logs from container ${container.names[0]} - will be loaded 5 seconds of logs`}
      >
        {loadingLogs ? <Loader size="md" center /> : logs}
      </Drawer>

      <Modal
        open={openModal}
        actionText="Remove"
        handleClose={handleModal}
        handleSuccess={handleSuccessModal}
        title="Remove container"
        text={
          <p>
            Are you sure you want to remove the container <b>{container.name}</b>?
          </p>
        }
      />
    </>
  );
};

Container.propTypes = {
  container: Props.shape({
    id: Props.string.isRequired,
    names: Props.arrayOf(Props.string).isRequired,
    image: Props.string.isRequired,
    status: Props.string.isRequired,
    created: Props.number.isRequired,
  }).isRequired,
};

export default Container;
