import usersData from '../data/users.js';
import bcrypt from 'bcrypt';

const createUser = async (userData) => {
  const isUserNameExist = await usersData.getUserByName(userData.user_name);
  if (isUserNameExist[0]) {
    return null;
  }

  userData.password = await bcrypt.hash(userData.password, 10);
  if (typeof userData.user_age === 'undefined') {
    userData.user_age = 'DEFAULT';
  }
  if (typeof userData.gender === 'undefined') {
    userData.gender = 'DEFAULT';
  }
  const newUser = await usersData.createUser(userData);
  return newUser;
};

const validateUser = (usersData) => async (username, password) => {
  const user = await usersData.getUserBy('username', username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return {
      error: serviceErrors.OPERATION_NOT_PERMITTED,
      data: null,
    };
  }

  if (user.is_deleted) {
    return {
      error: serviceErrors.RECORD_NOT_FOUND,
      data: null,
    };
  }

  return {
    error: null,
    data: user,
  };
};

export default {
  createUser,
  validateUser,
};
