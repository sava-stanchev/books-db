import {useState} from 'react';
import {Form} from "react-bootstrap";
import {HOST} from '../common/constants.js';

const UploadPoster = () => {
  const [file, setFile] = useState(null);

  const uploadFile = async (ev) => {
    ev.preventDefault();
    const fileData = new FormData();
    fileData.set('posters', file);

    const response = await fetch(`${HOST}/books/cover`, {
      method: 'PUT',
      headers: {
        'authorization': `bearer ${localStorage.getItem('token')}`
      },
      body: fileData
    });

    const data = await response.json();
  }
  
  return (
    <Form>
      <Form.Group>
        <Form.File id="the-file" label="Upload book cover" onChange={(e) => setFile(e.target.files[0])}/>
      </Form.Group>
    </Form>
  )
}

export default UploadPoster;
