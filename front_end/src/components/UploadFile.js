import React, { useState } from 'react';

const UploadFile = () => {
  const [fileName, setFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
return (
  <div>
    <form>
      <input type='text' value='Select file' onChange={(e) => setFileName(e.target.value)} />

      <input type='file' value={selectedFile} onChange={(e) => setSelectedFile(e.target.files[0])} />
    </form>
  </div>
)
}

export default UploadFile;