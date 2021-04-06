export default {
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
  title: (value) => typeof value === 'string' && value.length > 1 && value.length < 256,
  author: (value) => typeof value === 'string' && value.length > 3 && value.length < 256,
  genre: (value) => typeof value === 'string' && value.length > 1 && value.length < 40, // to check
  age: (value) => typeof value === 'number' && value > 1,
  isbn: (value) => typeof +value === 'string' && value.length === 10,
  publishingYear: (value) => typeof +value === 'number',
  language: (value) => typeof value === 'string',
  printLength: (value) => typeof +value === 'number' && value > 1,
  isDeleted: (value) => typeof value === 'boolean',
  isBorrowed: (value) => typeof value === 'boolean',
  }