import interestingTimesPoster from '../posters/interesting-times.jpg';
import mortPoster from '../posters/mort.jpg';
import winnetouPoster from '../posters/winnetou.jpg';

const books = [
    {
      title: 'Interesting times',
      author: 'Terry Pratchett',
      genre: 2,
      age_recommendation: 12,
      isbn: '0575058005',
      publishing_year: 1995,
      language: 3,
      print_length: 353,
      poster: interestingTimesPoster,
    },
    {
        title: 'Mort',
        author: 'Terry Pratchett',
        genre: 2,
        age_recommendation: 12,
        isbn: '0575000000',
        publishing_year: 1987,
        language: 2,
        print_length: 136,
        poster: mortPoster,
    },
    {
      title: 'Winnetou',
      author: 'Karl May',
      genre: 2,
      age_recommendation: 12,
      isbn: '0575000000',
      publishing_year: 1892,
      language: 2,
      print_length: 294,
      poster: winnetouPoster,
  },
];

export default books;
  