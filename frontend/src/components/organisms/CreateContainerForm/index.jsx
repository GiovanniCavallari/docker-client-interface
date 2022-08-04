import React, { useState } from 'react';
import Props from 'prop-types';
import { Button, Divider, FlexboxGrid } from 'rsuite';

import Card from '../../atoms/Card';
import Input from '../../atoms/Input';
import Select from '../../atoms/Select';

import './styles.less';

const CreateContainerForm = ({ containers }) => {
  const [formValue, setFormValue] = useState({
    name: '',
    image: '',
    links: null,
  });

  const handleFormChange = (input, value) => {
    setFormValue({ ...formValue, [input]: value });
  };

  return (
    <Card>
      <FlexboxGrid className="di-mb-16">
        <FlexboxGrid.Item colspan={12} className="di-create-container-colspan-12">
          <Input
            label="Name"
            value={formValue.name}
            placeholder="Type here..."
            onChange={(value) => handleFormChange('name', value)}
          />
        </FlexboxGrid.Item>

        <FlexboxGrid.Item colspan={12} className="di-colspan-12">
          <Input
            label="Image"
            value={formValue.image}
            placeholder="Type here..."
            onChange={(value) => handleFormChange('image', value)}
          />
        </FlexboxGrid.Item>
      </FlexboxGrid>

      <FlexboxGrid className="di-mb-16">
        <FlexboxGrid.Item colspan={24}>
          <Select
            label="Links"
            items={containers}
            value={formValue.links}
            placeholder="Select container links"
            onChange={(value) => handleFormChange('links', value)}
            multipleOptions
          />
        </FlexboxGrid.Item>
      </FlexboxGrid>

      <Divider />

      <FlexboxGrid justify="center" className="di-create-container-footer">
        <FlexboxGrid.Item>
          <Button appearance="default">Cancel</Button>
          <Button appearance="primary">Create container</Button>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </Card>
  );
};

CreateContainerForm.propTypes = {
  containers: Props.arrayOf(Props.string).isRequired,
};

export default CreateContainerForm;
