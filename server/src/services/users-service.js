import serviceErrors from "./service-errors.js";
import bcrypt from 'bcrypt';

export const signInUser = usersData => {
    return async (username, password) => {
        const user = await usersData.getWithRole(username);

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return {
                error: serviceErrors.INVALID_SIGNIN,
                user: null
            }
        }

        return {
            error: null,
            user: user
        }
    }
};
