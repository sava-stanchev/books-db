export default {
  title: (value) => typeof value === 'string' && value.length > 1 && value.length < 256,
  author: (value) => typeof value === 'string' && value.length > 1 && value.length < 256,
  genre: (value) => typeof +value === 'number',
  age: (value) => typeof +value === 'number' && +value > 1,
  isbn: (value) => typeof +value === 'string' && value.length === 10,
  publishing_year: (value) => typeof +value === 'number',
  language: (value) => typeof value === 'number',
  print_length: (value) => typeof +value === 'number' && value > 1,
  is_deleted: (value) => typeof value === 'boolean',
  is_borrowed: (value) => typeof value === 'boolean',
  }