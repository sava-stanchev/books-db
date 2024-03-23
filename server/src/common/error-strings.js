export default {
  user: {
    username: `Expected string with length [3 - 30]`,
    password: `Expected string with length [4 - 30]`,
    e_mail: `Expected valid e-mail`,
  },
  book: {
    title: "Expected string with length [1 - 100]",
    author: "Expected string with length [1 - 100]",
    genre: "Expected string with length [1 - 40]",
    year: "Expected year",
    language: "Expected string with length [1 - 40]",
    is_deleted: "Expected boolean",
  },
  review: {
    content: "Expected string with length [10 - 300]",
  },
};
