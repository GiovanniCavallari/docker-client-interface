import React from 'react';
import Props from 'prop-types';
import { FlexboxGrid } from 'rsuite';
import Dropdown from '../../atoms/Dropdown';

const VolumeItem = ({ volume, dropdowmItems }) => {
  return (
    <FlexboxGrid className="di-list">
      <FlexboxGrid.Item colspan={5} className="di-list-item">
        <p className="di-list-title">Name</p>
        <p>{volume.name}</p>
      </FlexboxGrid.Item>

      <FlexboxGrid.Item colspan={5} className="di-list-item">
        <p className="di-list-title">Source</p>
        <div className="di-list-item-info">
          <p>{volume.source}</p>
        </div>
      </FlexboxGrid.Item>

      <FlexboxGrid.Item colspan={5} className="di-list-item">
        <p className="di-list-title">Destination</p>
        <div className="di-list-item-info">
          <p>{volume.destination}</p>
        </div>
      </FlexboxGrid.Item>

      <FlexboxGrid.Item colspan={5} className="di-list-item">
        <p className="di-list-title">Created</p>
        <div className="di-list-item-info">
          <p>{new Date(volume.created * 1000).toLocaleString()}</p>
        </div>
      </FlexboxGrid.Item>

      <FlexboxGrid.Item colspan={4} className="di-list-item di-list-item-centered">
        <Dropdown items={dropdowmItems} />
      </FlexboxGrid.Item>
    </FlexboxGrid>
  );
};

VolumeItem.propTypes = {
  volume: Props.shape({
    name: Props.string.isRequired,
    driver: Props.string.isRequired,
    scope: Props.string.isRequired,
    source: Props.string.isRequired,
    destination: Props.string.isRequired,
    created: Props.number.isRequired,
    status: Props.string,
  }),
  dropdowmItems: Props.arrayOf(
    Props.shape({
      icon: Props.node,
      text: Props.string.isRequired,
      onClick: Props.func.isRequired,
    }).isRequired,
  ),
};

export default VolumeItem;
