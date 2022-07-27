import React, { useState } from 'react';
import Props from 'prop-types';
import { FaPlay, FaStop, FaTrashAlt, FaInfoCircle, FaReceipt } from 'react-icons/fa';

import Modal from '../../atoms/Modal';
import Drawer from '../../atoms/Drawer';
import JsonInspector from '../../atoms/JsonInspector';
import ContainerItem from '../../molecules/ContainerItem';

import './styles.less';

const Container = ({ container }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const handleSuccessModal = () => {
    setOpenModal(false);
  };

  const handleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  const dropdowmItems = [
    {
      text: 'Details',
      icon: <FaInfoCircle />,
      onClick: handleDrawer,
    },
    {
      text: 'Logs',
      icon: <FaReceipt />,
      onClick: handleDrawer,
    },
    {
      text: 'Start',
      icon: <FaPlay />,
      onClick: () => {},
    },
    {
      text: 'Stop',
      icon: <FaStop />,
      onClick: () => {},
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

      <Drawer open={openDrawer} placement="bottom" size="lg" title="Container details" onClose={handleDrawer}>
        <JsonInspector title={container.names[0]} data={container} />
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
