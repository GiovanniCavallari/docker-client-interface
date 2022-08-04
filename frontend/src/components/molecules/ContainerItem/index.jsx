import React from 'react';
import Props from 'prop-types';
import { FlexboxGrid, Tag } from 'rsuite';

import Dropdown from '../../atoms/Dropdown';

import './styles.less';

const ContainerItem = ({ container, dropdowmItems }) => {
  const tagColor = container.state === 'running' ? 'green' : 'red';

  return (
    <FlexboxGrid className="di-list-container">
      <FlexboxGrid.Item colspan={8} className="di-list-container-item">
        <p className="di-list-container-title">Image name</p>
        <p>{container.names[0]}</p>
        <p className="di-container-id">{container.id}</p>
      </FlexboxGrid.Item>

      <FlexboxGrid.Item colspan={4} className="di-list-container-item">
        <p className="di-list-container-title">Image</p>
        <div className="di-list-item-info">
          <p>{container.image}</p>
        </div>
      </FlexboxGrid.Item>

      <FlexboxGrid.Item colspan={4} className="di-list-container-item">
        <p className="di-list-container-title">Status</p>
        <div className="di-list-item-info">
          <Tag color={tagColor} className="di-list-item-tag">
            {container.status}
          </Tag>
        </div>
      </FlexboxGrid.Item>

      <FlexboxGrid.Item colspan={4} className="di-list-container-item">
        <p className="di-list-container-title">Created</p>
        <div className="di-list-item-info">
          <p>{new Date(container.created * 1000).toLocaleString()}</p>
        </div>
      </FlexboxGrid.Item>

      <FlexboxGrid.Item colspan={4} className="di-list-container-item di-list-container-item-centered">
        <Dropdown items={dropdowmItems} />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

ContainerItem.propTypes = {
  container: Props.shape({
    id: Props.string.isRequired,
    names: Props.arrayOf(Props.string).isRequired,
    image: Props.string.isRequired,
    status: Props.string.isRequired,
    created: Props.number.isRequired,
  }).isRequired,
  dropdowmItems: Props.arrayOf(
    Props.shape({
      icon: Props.node,
      text: Props.string.isRequired,
      onClick: Props.func.isRequired,
    }).isRequired,
  ),
};

export default ContainerItem;
