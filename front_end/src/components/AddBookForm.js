import {Col, Container, Row, Form, Button} from "react-bootstrap";

const AddBookForm = ({ genres, languages, book, updateBook, addBook }) => {
  
  return( 
    <Container>
      <Row>
        <Col>
          <h1>AddBook</h1>
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
                onChange={e => updateBook('title', e.target.value)}/>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Author</Form.Label>
                <Form.Control type="text" placeholder="Enter author" name="author" value={book.author} 
                onChange={e => updateBook('author', e.target.value)}/>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Age recommendation</Form.Label>
                <Form.Control type="text" placeholder="Enter age" name="age_recommendation" value={book.age_recommendation} 
                onChange={e => updateBook('age_recommendation', e.target.value)}/>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>isbn</Form.Label>
                <Form.Control type="text" placeholder="Enter ISBN" name="isbn" value={book.isbn} 
                onChange={e => updateBook('isbn', e.target.value)}/>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Publishing Year</Form.Label>
                <Form.Control type="text" placeholder="Enter pub year" name="publishing_year" value={book.publishing_year} 
                onChange={e => updateBook('publishing_year', e.target.value)}/>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Print length</Form.Label>
                <Form.Control type="text" placeholder="Enter print length" name="print length" value={book.print_length} 
                onChange={e => updateBook('print_length', e.target.value)}/>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Language</Form.Label>
                <Form.Control as="select" defaultValue="Choose..." name="language"
                value={book.language ? languages.filter(l => l.languages_id === book.language)[0].language:''}
                onChange={e => updateBook('language', languages.filter(l => l.language === e.target.value)[0].languages_id)}>
                  <option>Choose...</option>
                  {languages.map((l) => <option>{l.language}</option>)}
                </Form.Control>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Genre</Form.Label> 
                <Form.Control as="select" defaultValue="Choose..." name="gender"
                value={user.gender ? genders.filter(g => g.genders_id === user.gender)[0].gender:''}
                onChange={e => updateUser('gender', genders.filter(g => g.gender === e.target.value)[0].genders_id)}>
                  <option>Choose...</option>
                  {genders.map((g) => <option>{g.gender}</option>)}
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Button variant="primary" onClick={() => addBook()}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
};

export default RegistrationForm;
