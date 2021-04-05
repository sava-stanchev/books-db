import { user } from '../common/constants.js';

export default {
// -	number – auto, unique 
// -	username – string - [3 - 30], no special characters, unique
// -	password – string – [7 - 20], one uppercase, one number
// -	firstName – string – [1 - 20]
// -	lastName – string – [1 - 20]
// -	age – number > 0 || null
// -	gender – string (list)
// -	e-mail – string [6 - 40], include ‘@’, no unique
// -	isAdmin – Boolean
// -	isDeleted – Boolean
// -	isBanned – Boolean
userName: (value) => typeof value === 'string' && value.length > user.USERNAME_MIN_LENGTH && value.length < user.USERNAME_MAX_LENGTH,
password: (value) => typeof value === 'string' && value.length > user.PASSWORD_MIN_LENGTH && value.length < user.PASSWORD_MAX_LENGTH,
firstName: (value) => typeof value === 'string' && value.length > user.FIRSTNAME_MIN_LENGTH && value.length < user.FIRSTNAME_MAX_LENGTH,
lastName: (value) => typeof value === 'string' && value.length > user.LASTNAME_MIN_LENGTH && value.length < user.LASTNAME_MAX_LENGTH,
age: (value) => typeof value === 'number' && value > user.AGE_MIN,
gender: (value) => typeof value === 'string' && value.length > 1 && value.length < 20,
e_mail: (value) => typeof value === 'string' && value.length > 6 && value.includes('@'),
}