import React, { useState } from 'react';
import Props from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Button, FlexboxGrid } from 'rsuite';
import { FaPlus, FaArrowRight } from 'react-icons/fa';
import { routes } from '../../../enums/routes';

import Card from '../../atoms/Card';
import Input from '../../atoms/Input';
import Select from '../../atoms/Select';
import InputGroup from '../../molecules/InputGroup';

import './styles.less';
import InputDouble from '../../molecules/InputDouble';

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

  const basePort = {
    first: {
      name: 'first',
      label: 'Container port',
      value: '',
    },
    second: {
      name: 'second',
      label: 'Host port',
      value: '',
    },
  };

  const baseMount = {
    first: {
      name: 'first',
      label: 'Name',
      value: '',
    },
    second: {
      name: 'second',
      label: 'Target',
      value: '',
    },
  };

  const navigate = useNavigate();

  const [envList, setEnvList] = useState([baseEnv]);
  const [portList, setPortList] = useState([basePort]);
  const [mountList, setMountList] = useState([baseMount]);
  const [formValue, setFormValue] = useState({
    name: '',
    image: '',
    links: null,
  });

  const handleFormChange = (input, value) => {
    setFormValue({ ...formValue, [input]: value });
  };

  const handleAddNewEnv = () => {
    setEnvList([...envList, baseEnv]);
  };

  const handleAddNewPort = () => {
    setPortList([...portList, basePort]);
  };

  const handleAddNewMount = () => {
    setMountList([...mountList, baseMount]);
  };

  const handleEnvChange = (e, value, index) => {
    setEnvList(() => {
      const newEnvList = [...envList];
      newEnvList[index][e.target.name].value = value;
      return newEnvList;
    });
  };

  const handlePortChange = (e, value, index) => {
    setPortList(() => {
      const newPortList = [...portList];
      newPortList[index][e.target.name].value = value;
      return newPortList;
    });
  };

  const handleMountChange = (e, value, index) => {
    setMountList(() => {
      const newMountList = [...mountList];
      newMountList[index][e.target.name].value = value;
      return newMountList;
    });
  };

  const handleSubmit = () => {
    const environment = envList.map((env) => `${env.first.value.toUpperCase()}=${env.second.value}`);

    const ports = portList.map((port) => ({
      host_port: port.second.value,
      container_port: port.first.value,
    }));

    const mounts = mountList.map((mount) => ({
      name: mount.first.value,
      target: mount.second.value,
    }));

    console.log('ports: ', ports);
    console.log('mounts: ', mounts);
    console.log('env: ', environment);
    console.log('formValue: ', formValue);
  };

  return (
    <>
      <Card title="General">
        <FlexboxGrid className="di-mb-16">
          <FlexboxGrid.Item colspan={12} className="di-colspan-12">
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

      <Card title="Ports">
        {portList.map((port, index) => (
          <InputDouble
            key={index}
            first={port.first}
            second={port.second}
            onChange={(value, e) => handlePortChange(e, value, index)}
            className="di-create-container-input-group"
            separator={<FaArrowRight />}
            hasSeparator
          />
        ))}

        <Button appearance="ghost" className="di-create-container-add-item" onClick={handleAddNewPort}>
          <FaPlus /> Add new port
        </Button>
      </Card>

      <Card title="Volumes">
        {mountList.map((mount, index) => (
          <InputDouble
            key={index}
            first={mount.first}
            second={mount.second}
            onChange={(value, e) => handleMountChange(e, value, index)}
            className="di-create-container-input-group"
            separator={<FaArrowRight />}
            hasSeparator
          />
        ))}

        <Button appearance="ghost" className="di-create-container-add-item" onClick={handleAddNewMount}>
          <FaPlus /> Add new volume
        </Button>
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

        <Button appearance="ghost" className="di-create-container-add-item" onClick={handleAddNewEnv}>
          <FaPlus /> Add new env
        </Button>
      </Card>

      <FlexboxGrid justify="center" className="di-create-container-footer">
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
