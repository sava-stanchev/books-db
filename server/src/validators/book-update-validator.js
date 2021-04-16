import { book } from '../common/constants.js';

export default {
  title: (value) => typeof value === 'undefined' || typeof value === 'string' && value.length > book.TITLE_MIN_LENGTH && value.length < book.TITLE_MAX_LENGTH,
  author: (value) => typeof value === 'undefined' || typeof value === 'string' && value.length > book.AUTHOR_MIN_LENGTH && value.length < book.AUTHOR_MAX_LENGTH,
  genre: (value) => typeof value === 'undefined' || typeof +value === 'number',
  age_recommendation: (value) => typeof value === 'undefined' || typeof +value === 'number' && +value > book.AGE_MIN,
  isbn: (value) => typeof value === 'undefined' || typeof value === 'string' && value.length === book.ISBN_LENGTH,
  publishing_year: (value) => typeof value === 'undefined' || typeof +value === 'number',
  language: (value) => typeof value === 'undefined' || typeof value === 'number',
  print_length: (value) => typeof value === 'undefined' || typeof +value === 'number' && +value > book.PRINTLENGTH_MIN_LENGTH,
  is_deleted: (value) => typeof value === 'undefined' || typeof value === 'boolean',
  is_borrowed: (value) => typeof value === 'undefined' || typeof value === 'boolean',
}