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
userName: (value) => typeof value === 'string' && value.length > 3 && value.length < 30,
password: (value) => typeof value === 'string' && value.length > 7 && value.length < 20,
firstName: (value) => typeof value === 'string' && value.length > 1 && value.length < 20,
lastName: (value) => typeof value === 'string' && value.length > 1 && value.length < 20,
age: (value) => typeof value === 'number' && value > 0,
gender: (value) => typeof value === 'string' && value.length > 1 && value.length < 20,
e_mail: (value) => typeof value === 'string' && value.length > 6 && value.includes('@'),
}