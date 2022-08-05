import React, { useState } from 'react';
import Props from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Button, FlexboxGrid } from 'rsuite';
import { FaPlus, FaArrowRight, FaEquals } from 'react-icons/fa';
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

  const handleAddNewItem = (item) => {
    switch (item) {
      case 'env':
        setEnvList([...envList, baseEnv]);
        break;

      case 'port':
        setPortList([...portList, basePort]);
        break;

      case 'mount':
        setMountList([...mountList, baseMount]);
        break;

      default:
        break;
    }
  };

  const handleListChange = (list, e, value, index) => {
    switch (list) {
      case 'env':
        setEnvList(() => {
          const newEnvList = [...envList];
          newEnvList[index][e.target.name].value = value;
          return newEnvList;
        });
        break;

      case 'port':
        setPortList(() => {
          const newPortList = [...portList];
          newPortList[index][e.target.name].value = value;
          return newPortList;
        });
        break;

      case 'mount':
        setMountList(() => {
          const newMountList = [...mountList];
          newMountList[index][e.target.name].value = value;
          return newMountList;
        });
        break;

      default:
        break;
    }
  };

  const handleSubmit = () => {
    const environment = envList.map((env) => {
      const firstValue = env.first.value;
      const secondValue = env.first.value;

      if (firstValue && secondValue) {
        return `${env.first.value.toUpperCase()}=${env.second.value}`;
      }
    });

    const ports = portList.map((port) => {
      const firstValue = port.first.value;
      const secondValue = port.first.value;

      if (firstValue && secondValue) {
        return {
          host_port: port.second.value,
          container_port: port.first.value,
        };
      }
    });

    const mounts = mountList.map((mount) => {
      const firstValue = mount.first.value;
      const secondValue = mount.first.value;

      if (firstValue && secondValue) {
        return {
          name: mount.first.value,
          target: mount.second.value,
        };
      }
    });

    console.log('env: ', environment);
    console.log('ports: ', ports);
    console.log('mounts: ', mounts);
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
          <InputGroup
            key={index}
            first={port.first}
            second={port.second}
            onChange={(value, e) => handleListChange('port', e, value, index)}
            className="di-create-container-input-group"
            separator={<FaArrowRight />}
            hasSeparator
          />
        ))}

        <Button appearance="ghost" className="di-create-container-add-item" onClick={() => handleAddNewItem('port')}>
          <FaPlus /> Add new port
        </Button>
      </Card>

      <Card title="Volumes">
        {mountList.map((mount, index) => (
          <InputGroup
            key={index}
            first={mount.first}
            second={mount.second}
            onChange={(value, e) => handleListChange('mount', e, value, index)}
            className="di-create-container-input-group"
            separator={<FaArrowRight />}
            hasSeparator
          />
        ))}

        <Button appearance="ghost" className="di-create-container-add-item" onClick={() => handleAddNewItem('mount')}>
          <FaPlus /> Add new volume
        </Button>
      </Card>

      <Card title="Environment">
        {envList.map((env, index) => (
          <InputGroup
            key={index}
            first={env.first}
            second={env.second}
            onChange={(value, e) => handleListChange('env', e, value, index)}
            className="di-create-container-input-group"
            separator={<FaEquals />}
            hasSeparator
          />
        ))}

        <Button appearance="ghost" className="di-create-container-add-item" onClick={() => handleAddNewItem('env')}>
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
