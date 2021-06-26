import {user} from '../common/constants.js';

export default {
  username: (value) => typeof value === 'string' && value.length >= 3 && value.length <= 15,
  password: (value) => typeof value === 'string' && value.length > user.PASSWORD_MIN_LENGTH && value.length < user.PASSWORD_MAX_LENGTH,
  first_name: (value) => typeof value === 'string' && value.length > user.FIRSTNAME_MIN_LENGTH && value.length < user.FIRSTNAME_MAX_LENGTH,
  last_name: (value) => typeof value === 'string' && value.length > user.LASTNAME_MIN_LENGTH && value.length < user.LASTNAME_MAX_LENGTH,
  user_age: (value) => typeof +value === 'number' && +value > user.AGE_MIN,
  email: (value) => /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value),
  gender: (value) => typeof +value === 'number',
};
