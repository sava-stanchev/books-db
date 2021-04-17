import { review } from '../common/constants.js';

export default {
    user_id: (value) => typeof value === 'number', // && exist in users table
    book_id: (value) => typeof value === 'number', // && exist in books table
    content: (value) => typeof value === 'string' && value.length > review.CONTENT_MIN_LENGTH && value.length < review.CONTENT_MAX_LENGTH
}