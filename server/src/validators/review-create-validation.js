import { review } from '../common/constants.js';

export default {
// -	id – number – auto, unique
// -	userId – number
// -	bookId – number
// -	content – large string
// -	dateCreated – date
// -	isDeleted – Boolean
userId: (value) => typeof value === 'number', // && exist in users table
bookId: (value) => typeof value === 'number', // && exist in books table
content: (value) => typeof value === 'string' && value.length > review.CONTENT_MIN_LENGTH && value.length < review.CONTENT_MAX_LENGTH
}