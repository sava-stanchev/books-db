import { book } from '../common/constants.js';

export default {
  //   -	id - number – auto, unique 
  // -	Title – string [1 - 256]
  // -	Author – string [3 - 256]
  // -	Genre – string (list)
  // -	Age_recommendation – number >0
  // -	ISBN – string [10]
  // -	PublicationDate – date
  // -	Language – string (list)
  // -	printLength – number > 1
  // -	isDeleted – Boolean
  // -	isBorrowed – Boolean
  // -	bookReservation – number
  // -	bookCount – number
  // -	readingConts - number
  title: (value) => typeof value === 'string' && value.length > book.TITLE_MIN_LENGTH && value.length < book.TITLE_MAX_LENGTH,
  author: (value) => typeof value === 'string' && value.length > book.AUTHOR_MIN_LENGTH && value.length < book.AUTHOR_MAX_LENGTH,
  genre: (value) => typeof value === 'string' && value.length > 1 && value.length < 40, // to check
  age: (value) => typeof value === 'number' && value > book.AGE_MIN,
  isbn: (value) => typeof value === 'string' && value.length === book.ISBN_LENGTH,
  publicationDate: (value) => value instanceof Date,
  language: (value) => typeof value === 'string',
  printLength: (value) => typeof value === 'number' && value > book.PRINTLENGTH_MIN_LENGTH
  }