import {useState} from 'react';
import {HOST} from '../common/constants.js';
import {useHistory} from "react-router-dom";
import { Button } from 'react-bootstrap';

const UploadPoster = ({books_id}) => {
  const [file, setFile] = useState();
  
  const send = () => {
    const data = new FormData();
    data.append('file', file);

    fetch(`${HOST}/books/${books_id}/upload`, {
      method: 'POST',
      headers: {
  
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: data
    }, )
    .then(res => console.log(res))
    .catch(err => console.log(err));
    
    history.go(0)
  };

  const history = useHistory();

  return (
    <>
      <form action="#" method="post" encType="multipart/form-data" style={{marginLeft: '15px'}}>
        <div className="upload-container">
          <input type="file" id="file" onChange={event => {
            const file = event.target.files[0];
            setFile(file);
          }} />
        </div>
      </form>
      <Button onClick={send} style={{marginTop: '10px', marginLeft: '15px'}}>Update Cover</Button>
    </>
  )
}

export default UploadPoster;
