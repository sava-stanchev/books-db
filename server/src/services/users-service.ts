import bcrypt from "bcrypt";
import serviceErrors from "../common/service-errors.js";
import { User } from "src/types.js";

type UsersData = {
  createUser: (user: User) => Promise<User | null>;
  getAllUsers: () => Promise<User[]>;
  deleteUser: (id: number) => Promise<boolean>;
  getUserBy: (
    column: keyof User,
    value: string | number
  ) => Promise<User | null>;
};

type PromiseResult = {
  error: number | null;
  data: User | null;
};

const createUser =
  (usersData: UsersData) =>
  async (user: User): Promise<PromiseResult> => {
    const { username, email, password } = user;

    const usernameExists = await usersData.getUserBy("username", username);
    const emailExists = await usersData.getUserBy("email", email);

    if (usernameExists || emailExists) {
      return {
        error: serviceErrors.DUPLICATE_RECORD,
        data: null,
      };
    }

    const cryptedPassword = await bcrypt.hash(password, 10);

    return {
      error: null,
      data: await usersData.createUser({
        ...user,
        password: cryptedPassword,
      }),
    };
  };

const validateUser =
  (usersData: UsersData) =>
  async (username: string, password: string): Promise<PromiseResult> => {
    const user = await usersData.getUserBy("username", username);

    if (!user) {
      return {
        error: serviceErrors.RECORD_NOT_FOUND,
        data: null,
      };
    }

    if (!(await bcrypt.compare(password, user.password))) {
      return {
        error: serviceErrors.OPERATION_NOT_PERMITTED,
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
