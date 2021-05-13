import {useState} from 'react';
import {HOST} from '../common/constants.js';
import Axios from 'axios';
import {useHistory} from "react-router-dom";
import {Button} from "react-bootstrap";

const UploadPoster = ({books_id}) => {
  const [file, setFile] = useState();
  
  const send = () => {
    const data = new FormData();
    data.append('file', file);

    Axios.post(`${HOST}/books/${books_id}/upload`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
    
    history.go(0)
  };
  const history = useHistory();
  return (
    <>
      <form action="#">
        <div className="flex">
        <label htmlFor="file">Update book cover:</label>
        <input type="file" id="file" accept=".jpg" onChange={event => {
          const file = event.target.files[0];
          setFile(file);
        }} />
      </div>
    </form>
    <Button onClick={send}>Upload</Button>
    </>
  )
}

export default UploadPoster;
