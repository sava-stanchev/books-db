import { book } from '../common/constants.js';

export default {
  title: (value) => typeof value === 'string' && value.length > book.TITLE_MIN_LENGTH && value.length < book.TITLE_MAX_LENGTH,
  author: (value) => typeof value === 'string' && value.length > book.AUTHOR_MIN_LENGTH && value.length < book.AUTHOR_MAX_LENGTH,
  genre: (value) => typeof +value === 'number',  // to check
  age_recommendation: (value) => typeof +value === 'number' && +value > book.AGE_MIN,
  isbn: (value) => typeof value === 'string' && value.length === book.ISBN_LENGTH,
  publishing_year: (value) => typeof +value === 'number', //isNan
  language: (value) => typeof +value === 'number',
  print_length: (value) => typeof +value === 'number' && +value > book.PRINTLENGTH_MIN_LENGTH,
}