import React, { useState } from 'react';
import Props from 'prop-types';
import { mutate as globalMutate } from 'swr';
import { FaTrashAlt, FaInfoCircle } from 'react-icons/fa';
import api from '../../../services/api';
import useVolumeMessageStore from '../../../store/useVolumesMessages';

import Modal from '../../atoms/Modal';
import Drawer from '../../atoms/Drawer';
import JsonInspector from '../../atoms/JsonInspector';
import VolumeItem from '../../molecules/VolumeItem';

const Volume = ({ volume }) => {
  const { setMessage, clearMessage } = useVolumeMessageStore((state) => ({
    setMessage: state.setMessage,
    clearMessage: state.clearMessage,
  }));

  const [openModal, setOpenModal] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  const handleModal = () => {
    setOpenModal(!openModal);
  };

  const handleSuccessModal = () => {
    clearMessage();

    api
      .post(`/volumes/${volume.name}/remove`)
      .then(() => {
        globalMutate('/volumes');
      })
      .catch((err) => {
        setMessage(err.response.data.message);
      })
      .finally(() => {
        setOpenModal(false);
      });
  };

  const handleDetails = () => {
    setOpenDetails(!openDetails);
  };

  const dropdowmItems = [
    {
      text: 'Details',
      icon: <FaInfoCircle />,
      onClick: handleDetails,
    },
    {
      text: 'Remove',
      icon: <FaTrashAlt />,
      onClick: handleModal,
    },
  ];

  return (
    <>
      <VolumeItem volume={volume} dropdowmItems={dropdowmItems} />

      <Drawer
        size="lg"
        open={openDetails}
        placement="bottom"
        onClose={handleDetails}
        title={`Details from volume ${volume.name}`}
      >
        <JsonInspector title={volume.name} data={volume} />
      </Drawer>

      <Modal
        open={openModal}
        actionText="Remove"
        handleClose={handleModal}
        handleSuccess={handleSuccessModal}
        title="Remove container"
        text={
          <p>
            Are you sure you want to remove the volume <b>{volume.name}</b>?
          </p>
        }
      />
    </>
  );
};

Volume.propTypes = {
  volume: Props.shape({
    name: Props.string.isRequired,
    driver: Props.string.isRequired,
    scope: Props.string.isRequired,
    source: Props.string.isRequired,
    destination: Props.string.isRequired,
    created: Props.number.isRequired,
    status: Props.string,
  }),
};

export default Volume;
