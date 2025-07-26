import './ImgInput.css'
import { useState, useRef } from 'react'

export default function ImgInput() {

    const [imgFile, setImgFile] = useState(null)
    const [error, setError] = useState(null)
    const [preview, setPreview] = useState(null)
    const [loading, setLoading] = useState(false)
    const fileInputRef = useRef(null);

    const handleUploadedFile = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImgFile(file);
            setError(null)

            const reader = new FileReader();
            reader.onload = (e) =>  setPreview(e.target.result)
            reader.readAsDataURL(file)
        }
        else {
            setError("Please select a valid image file.")
        }
    }

    const predictFood = async () => {
        if (!imgFile) {
            setError('Please select an image first.')
            return;
        }

        setLoading(true);
        setError(null);
        // setPrediction(null);

        const formData = new FormData()
        formData.append('file', imgFile);

        try {
        // Use environment variable or fallback to localhost
        const API_URL = 'http://localhost:8000';
        const response = await fetch(`${API_URL}/predict`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        console.log(`This is reponse:`, response);

        const result = await response.json();
        if (result.success) {
            console.log(`This is result:`, result);
            // setPredictions(result.prediction);
        } else {
            setError('Prediction failed');
        }
        } catch (err) {
            setError(`Error: ${err.message}. Make sure the FastAPI server is running on localhost:8000`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <div className="inputContainer">
                {preview? 
                    <>
                        <img src={preview} alt="Preview" className='previewImg'/>
                        <p>Click to select a different image</p>
                    </> :
                    <>
                        <h3>Upload an image file</h3>
                    </>
                }
                <input ref={fileInputRef} type="file" accept='image/jpg, image/png' 
                onChange={handleUploadedFile}/>
                <button onClick={predictFood} disabled={!imgFile || loading}>Analyse</button>
            </div>
            <div className="outputContainer">
                {loading ? (
                  <div className="loader">
                    <span style={{"--letter":1}}>A</span>
                    <span style={{"--letter":2}}>N</span>
                    <span style={{"--letter":3}}>A</span>
                    <span style={{"--letter":4}}>L</span>
                    <span style={{"--letter":5}}>Y</span>
                    <span style={{"--letter":6}}>S</span>
                    <span style={{"--letter":7}}>I</span>
                    <span style={{"--letter":8}}>N</span>
                    <span style={{"--letter":9}}>G</span>
                    <span style={{"--letter":10}}>.</span>
                    <span style={{"--letter":11}}>.</span>
                    <span style={{"--letter":12}}>.</span>
                  </div>
                ) : (
                  ''
                )}
            </div>
        </>
       
    )
}