const AddBookForm = ({ genres, languages, book, updateBook, addBook }) => {
  
  return(
    <div className="update-book-form">
      <div className="update-book-label-input-container">
        <div className="update-book-label-input">
          <label className="update-book-label">Title</label>
          <input className="update-book-input" type="text" placeholder="Enter title" name="title" value={book.title} 
          onChange={e => updateBook('title', e.target.value)}/>
        </div>
        <div className="update-book-label-input">
          <label className="update-book-label">Author</label>
          <input className="update-book-input" type="text" placeholder="Enter author" name="author" value={book.author} 
          onChange={e => updateBook('author', e.target.value)}/>
        </div>
        <div className="update-book-label-input">
          <label className="update-book-label">Age Recommendation</label>
          <input className="update-book-input" type="text" placeholder="Enter age recommendation" name="age_recommendation" value={book.age_recommendation} 
          onChange={e => updateBook('age_recommendation', e.target.value)}/>
        </div>
        <div className="update-book-label-input">
          <label className="update-book-label">ISBN</label>
          <input className="update-book-input" type="text" placeholder="Enter ISBN" name="isbn" value={book.isbn} 
          onChange={e => updateBook('isbn', e.target.value)}/>
        </div>
        <div className="update-book-label-input">
          <label className="update-book-label">Publishing Year</label>
          <input className="update-book-input" type="text" placeholder="Enter publishing year" name="publishing_year" value={book.publishing_year} 
          onChange={e => updateBook('publishing_year', e.target.value)}/>
        </div>
        <div className="update-book-label-input">
          <label className="update-book-label">Print Length</label>
          <input className="update-book-input" type="text" placeholder="Enter print length" name="print length" value={book.print_length} 
          onChange={e => updateBook('print_length', e.target.value)}/>
        </div>
        <div className="update-book-label-input">
          <label className="update-book-label">Language</label>
          <select style={{marginRight: '0px', width: '263px', marginBottom: '8px'}} as="select" name="language"
          value={book.language ? languages.filter(l => l.languages_id === book.language)[0].language : 'Choose...'}
          onChange={e => updateBook('language', languages.filter(l => l.language === e.target.value)[0] !== undefined ? languages.filter(l => l.language === e.target.value)[0].languages_id : null)}>
            <option>Choose...</option>
            {languages.map((l) => <option key={l.language}>{l.language}</option>)}
          </select>
        </div>
        <div className="update-book-label-input">
          <label className="update-book-label">Genre</label> 
          <select style={{marginRight: '0px', width: '263px'}} as="select" name="genre"
          value={book.genre ? genres.filter(g => g.genres_id === book.genre)[0].genre : 'Choose...'}
          onChange={e => updateBook('genre', genres.filter(g => g.genre === e.target.value)[0] !== undefined ? genres.filter(g => g.genre === e.target.value)[0].genres_id : null)}>
            <option>Choose...</option>
            {genres.map((g) => <option key={g.genre}>{g.genre}</option>)}
          </select>
        </div>
        <button className="btn" style={{marginTop: '15px', marginLeft: '170px'}} variant="primary" onClick={() => addBook()}>
          Create
        </button>
      </div>
    </div>
  )
};

export default AddBookForm;
