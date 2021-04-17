import usersData from '../data/users.js';
import bcrypt from 'bcrypt';

const createUser = async (userData) => {
  const isUserNameExist = await usersData.getUserByName(userData.user_name);
  if (isUserNameExist[0]) {
    return null;
  }

  userData.password = await bcrypt.hash(userData.password, 10);
  const newUser = await usersData.createUser(userData);
  return newUser;
};

export default {
  createUser,
}
