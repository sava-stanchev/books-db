export default {
  user: {
    username: `Expected string with length [3 - 30]`,
    password: `Expected string with length [4 - 30]`,
    first_name: `Expected string with length [2 - 20]`,
    last_name: `Expected string with length [2 - 20]`,
    user_age: `Expected number bigger than 1`,
    gender: `Expected number`,
    e_mail: `Expected valid e-mail`,
  },
  book: {
    title: 'Expected string with length [1 - 100]',
    author: 'Expected string with length [1 - 100]',
    genre: 'Expected string with length [1 - 40]',
    age_recommendation: 'Expected number bigger than 1',
    isbn: 'Expected string with length 10',
    publishing_year: 'Expected year',
    language: 'Expected string with length [1 - 40]',
    print_length: 'Expected number bigger than 1',
    is_deleted: 'Expected boolean',
    is_borrowed: 'Expected boolean',
  },
  review: {
    content: 'Expected string with length [10 - 300]',
  },
};
