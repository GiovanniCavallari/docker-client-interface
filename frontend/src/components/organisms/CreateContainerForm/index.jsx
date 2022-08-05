import React, { useState } from 'react';
import Props from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Button, FlexboxGrid } from 'rsuite';
import { FaPlus } from 'react-icons/fa';
import { routes } from '../../../enums/routes';

import Card from '../../atoms/Card';
import Input from '../../atoms/Input';
import Select from '../../atoms/Select';
import InputGroup from '../../molecules/InputGroup';

import './styles.less';

const CreateContainerForm = ({ containers }) => {
  const baseEnv = {
    first: {
      name: 'first',
      uppercase: true,
      value: '',
    },
    second: {
      name: 'second',
      uppercase: false,
      value: '',
    },
  };

  const navigate = useNavigate();

  const [envList, setEnvList] = useState([baseEnv]);
  const [formValue, setFormValue] = useState({
    name: '',
    image: '',
    links: null,
  });

  const handleFormChange = (input, value) => {
    setFormValue({ ...formValue, [input]: value });
  };

  const handleEnvChange = (e, value, index) => {
    setEnvList(() => {
      const newEnvList = [...envList];
      newEnvList[index][e.target.name].value = value;
      return newEnvList;
    });
  };

  const handleAddNewEnv = () => {
    setEnvList([...envList, baseEnv]);
  };

  const handleSubmit = () => {
    const environment = envList.map((env) => `${env.first.value.toUpperCase()}=${env.second.value}`);

    console.log(environment);
    console.log(formValue);
  };

  return (
    <>
      <Card title="General">
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
      </Card>

      <Card title="Environment">
        {envList.map((env, index) => (
          <InputGroup
            key={index}
            separator="="
            first={env.first}
            second={env.second}
            onChange={(value, e) => handleEnvChange(e, value, index)}
            className="di-create-container-input-group"
          />
        ))}

        <Button appearance="ghost" className="di-create-container-add-env" onClick={handleAddNewEnv}>
          <FaPlus /> Add new env
        </Button>
      </Card>

      <FlexboxGrid justify="end" className="di-create-container-footer">
        <FlexboxGrid.Item>
          <Button appearance="default" onClick={() => navigate(routes.INDEX)}>
            Cancel
          </Button>
          <Button appearance="primary" onClick={handleSubmit}>
            Create container
          </Button>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </>
  );
};

CreateContainerForm.propTypes = {
  containers: Props.arrayOf(Props.string).isRequired,
};

export default CreateContainerForm;
