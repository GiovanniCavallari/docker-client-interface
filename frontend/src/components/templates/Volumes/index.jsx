import React from 'react';
import Props from 'prop-types';
import { Content } from 'rsuite';
import { FaTrashAlt } from 'react-icons/fa';

import Modal from '../../atoms/Modal';
import ContentHeader from '../../molecules/ContentHeader';
import AdminTemplate from '../Admin';

const VolumesTemplate = ({ children, openModal, handleModal, handleRefresh, handlePruneVolumes }) => {
  return (
    <AdminTemplate>
      <Content className="di-admin-content">
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
        {children}
      </Content>

      <Modal
        open={openModal}
        title="Prune volumes"
        actionText="Prune"
        handleClose={handleModal}
        handleSuccess={handlePruneVolumes}
        text={<p>Are you sue you want to prune all volumes?</p>}
      />
    </AdminTemplate>
  );
};

VolumesTemplate.propTypes = {
  children: Props.node.isRequired,
  openModal: Props.bool.isRequired,
  handleModal: Props.func.isRequired,
  handleRefresh: Props.func.isRequired,
  handlePruneVolumes: Props.func.isRequired,
};

export default VolumesTemplate;
