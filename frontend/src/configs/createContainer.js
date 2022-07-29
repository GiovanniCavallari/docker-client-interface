import { Schema } from 'rsuite';

const validation = Schema.Model({
  name: Schema.Types.StringType().isRequired('This field is required.'),
  email: Schema.Types.StringType().isEmail('Please enter a valid email address.').isRequired('This field is required.'),
  password: Schema.Types.StringType().isRequired('This field is required.'),
});

const fields = [
  {
    id: 'name',
    name: 'name',
    type: 'text',
    label: 'Username',
    helperText: 'Required',
  },
  {
    id: 'email',
    name: 'email',
    type: 'text',
    label: 'Email',
    helperText: 'Required',
  },
  {
    id: 'password',
    name: 'password',
    type: 'password',
    label: 'Password',
    helperText: 'Required',
    autoComplete: 'off',
  },
];

export { fields, validation };
