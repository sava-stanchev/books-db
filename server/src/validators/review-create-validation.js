import {review} from '../common/constants.js';

export default {
  content: (value) => typeof value === 'string' && value.length > review.CONTENT_MIN_LENGTH && value.length < review.CONTENT_MAX_LENGTH,
};
