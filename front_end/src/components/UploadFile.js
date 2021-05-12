import {useState} from 'react';

const UploadPoster = () => {
  const [file, setFile] = useState();

  const send = event => {
    const data = new FormData();
    data.append('file', file);

    console.log(data);
  };
  
  return (
    <form action="#">
      <div className="flex">
        <label htmlFor="file">Book cover: </label>
        <input type="file" id="file" accept=".jpg" onChange={event => {
          const file = event.target.files[0];
          setFile(file);
        }} />
      </div>
    </form>
  )
}

export default UploadPoster;
