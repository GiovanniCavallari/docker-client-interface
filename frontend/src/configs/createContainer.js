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
export { baseEnv, basePort, baseMount };
