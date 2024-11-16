import React, { useState } from 'react';
import './FileUpload.css';
import axios from 'axios'

const FileUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileUpload = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('file', file);
        await axios.post('/api/emails/upload', formData);
    };

    return (
        <div className="file-upload-container">
            <input type="file" onChange={handleFileUpload} />
            <button onClick={handleSubmit}>Upload Emails</button>
        </div>
    );
};

export default FileUpload;
