import {Col, Container, Row, Form, Button} from "react-bootstrap";

const UpdateBookForm = ({ genres, languages, book, updateBookProps, updateBook }) => {
  
  return( 
    <Container>
      <Row>
        <Col>
          <h1>Update!</h1>
        </Col>
      </Row>
      <br/>

      <Row>
        <Col>
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" name="title" value={book.title} 
                onChange={e => updateBookProps('title', e.target.value)}/>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Author</Form.Label>
                <Form.Control type="text" placeholder="Enter author" name="author" value={book.author} 
                onChange={e => updateBookProps('author', e.target.value)}/>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Age Recommendation</Form.Label>
                <Form.Control type="text" placeholder="Enter age recommendation" name="age_recommendation" value={book.age_recommendation} 
                onChange={e => updateBookProps('age_recommendation', e.target.value)}/>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>ISBN</Form.Label>
                <Form.Control type="text" placeholder="Enter ISBN" name="isbn" value={book.isbn} 
                onChange={e => updateBookProps('isbn', e.target.value)}/>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Publishing Year</Form.Label>
                <Form.Control type="text" placeholder="Enter publishing year" name="publishing_year" value={book.publishing_year} 
                onChange={e => updateBookProps('publishing_year', e.target.value)}/>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Print Length</Form.Label>
                <Form.Control type="text" placeholder="Enter print length" name="print length" value={book.print_length} 
                onChange={e => updateBookProps('print_length', e.target.value)}/>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Language</Form.Label>
                <Form.Control as="select" defaultValue="Choose..." name="language"
                value={book.languages ? languages.filter(l => l.languages_id === book.languages)[0].languages:''}
                onChange={e => updateBookProps('language', languages.filter(l => l.language === e.target.value)[0].language)}>
                  <option>{!book.language ? `Choose...` : book.language}</option>
                  {languages.map((l) => <option>{l.language}</option>)}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Genre</Form.Label> 
                <Form.Control as="select" defaultValue="Choose..." name="genre"
                value={book.genres ? genres.filter(g => g.genres_id === book.genre)[0].genre:''}
                onChange={e => updateBookProps('genre', genres.filter(g => g.genre === e.target.value)[0].genre)}>
                  <option>{!book.genre ? `Choose...` : book.genre}</option>
                  {genres.map((g) => <option>{g.genre}</option>)}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Button variant="primary" onClick={() => updateBook()}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
};

export default UpdateBookForm;
