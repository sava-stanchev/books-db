export default {
  user: {
    userName: `Expected string with length [1 - 30]`,
    password: `Expected string with length [1 - 30]`,
    firstName: `Expected string with length [1 - 20]`,
    lastName: `Expected string with length [1 - 20]`,
    userAge: `Expected number bigger than 1`,
    gender: `Expected string with length [1 - 30]`,
    e_mail: `Expected valid e-mail`,
  },
  book: {
    title: 'Expected string with length [1 - 256]',
    author:'Expected string with length [1 - 256]',
    genre: 'Expected string with length [1 - 40]',
    age: 'Expected number bigger than 1',
    isbn: 'Expected string with length 10',
    publishingYear: 'Expected date',
    language: 'Expected string with length [1 - 40]',
    printLength: 'Expected number bigger than 1',
    isDeleted: 'Expected boolean',
    isBorrowed: 'Expected boolean',
  },
  review: {
    text: 'Expected string with length [10 - 300]',
  }
};