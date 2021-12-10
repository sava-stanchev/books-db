const UpdateBookForm = ({ genres, languages, book, updateBookProps, updateBook }) => {
  
  return(
    <div className="update-book-form">
      <div className="update-book-label-input-container">
        <div className="update-book-label-input">
          <label className="update-book-label">Title</label>
          <input className="update-book-input" type="text" placeholder="Enter title" name="title" value={book.title} 
          onChange={e => updateBookProps('title', e.target.value)}/>
        </div>
        <div className="update-book-label-input">
          <label className="update-book-label">Author</label>
          <input className="update-book-input" type="text" placeholder="Enter author" name="author" value={book.author} 
          onChange={e => updateBookProps('author', e.target.value)}/>
        </div>
        <div className="update-book-label-input">
          <label className="update-book-label">Age Recommendation</label>
          <input className="update-book-input" type="text" placeholder="Enter age recommendation" name="age_recommendation" value={book.age_recommendation} 
          onChange={e => updateBookProps('age_recommendation', e.target.value)}/>
        </div>
        <div className="update-book-label-input">
          <label className="update-book-label">ISBN</label>
          <input className="update-book-input" type="text" placeholder="Enter ISBN" name="isbn" value={book.isbn} 
          onChange={e => updateBookProps('isbn', e.target.value)}/>
        </div>
        <div className="update-book-label-input">
          <label className="update-book-label">Publishing Year</label>
          <input className="update-book-input" type="text" placeholder="Enter publishing year" name="publishing_year" value={book.publishing_year} 
          onChange={e => updateBookProps('publishing_year', e.target.value)}/>
        </div>
        <div className="update-book-label-input">
          <label className="update-book-label">Print Length</label>
          <input className="update-book-input" type="text" placeholder="Enter print length" name="print length" value={book.print_length} 
          onChange={e => updateBookProps('print_length', e.target.value)}/>
        </div>
        <div className="update-book-label-input">
          <label className="update-book-label">Language</label>
          <select style={{marginRight: '0px', width: '263px', marginBottom: '8px'}} as="select" name="language"
          value={book.languages ? languages.filter(l => l.languages_id === book.languages)[0].languages : 'Choose...'}
          onChange={e => updateBookProps('language', languages.filter(l => l.language === e.target.value)[0].language)}>
            <option>{!book.language ? `Choose...` : book.language}</option>
            {languages.map((l) => <option key={l.language}>{l.language}</option>)}
          </select>
        </div>
        <div className="update-book-label-input">
          <label className="update-book-label">Genre</label> 
          <select style={{marginRight: '0px', width: '263px'}} as="select" name="genre"
          value={book.genres ? genres.filter(g => g.genres_id === book.genre)[0].genre : 'Choose...'}
          onChange={e => updateBookProps('genre', genres.filter(g => g.genre === e.target.value)[0].genre)}>
            <option>{!book.genre ? `Choose...` : book.genre}</option>
            {genres.map((g) => <option key={g.genre}>{g.genre}</option>)}
          </select>
        </div>
        <button className="btn" style={{marginTop: '15px', marginLeft: '170px'}} variant="primary" onClick={() => updateBook()}>
          Update
        </button>
      </div>
    </div>
  )
};

export default UpdateBookForm;
