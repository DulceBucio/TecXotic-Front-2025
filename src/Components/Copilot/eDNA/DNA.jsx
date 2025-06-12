import './DNA.css';
import React, { useState } from 'react';
import { copilot_address } from '../../Constants';

const DNA = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [specie, setSpecie] = useState(null);
  const [similarity, setSimilarity] = useState(null)

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setLoading(true);
    try {
      const result = await fetch(`${copilot_address}/DNA`, {
        method: 'POST',
        body: formData,
      });

      const data = await result.json();
      console.log(data);
      setSpecie(data.specimen)
      setSimilarity(data.similarity)
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetFields = () => {
    setSpecie(null)
    setSimilarity(null)
  }

  return (
    <div className="container">
      <div className="buttons-container">
        <input id="file" type="file" className='input-file'onChange={handleFileChange} />
        {file && (
          <button className="action-button" onClick={handleUpload} disabled={loading}>
            {loading ? 'Uploading...' : 'Get specie'}
          </button>
        )}
        <p className='reset-btn' onClick={resetFields}>Clear fields</p>
      </div>
      <div className="results">
        <div className="result-container">
          <h3> Most accurate match: </h3>
          <div className="result-background">
            <h3> {specie} </h3>
          </div>
        </div>
        <div className="accuracy-container">
          <h3> By: </h3>
          <div className="result-background">
          <h3>{similarity !== null ? `${similarity}%` : '—'}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DNA;