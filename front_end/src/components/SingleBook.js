import {useEffect, useState} from 'react';

const SingleBook = (props) => {
  const [book, setBook] = useState(null);
  const {id} = props.match.params;
  console.log(id);

  useEffect(() => {
      fetch(`http://localhost:5555/books/${id}`,
      { method: 'GET',
      })
      .then((response) => response.json())
      .then((data) => setBook(data));
    }, [id]
  );
  console.log(book);
  if(book === null) return <div>loading...</div>
  const b = book[0];

  return (
    <div>
      {b.title}
    </div>
  )
};

export default SingleBook;