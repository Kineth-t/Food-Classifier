import './ImgInput.css'
import { useState, useRef } from 'react'

export default function ImgInput() {

    const [imgFile, setImgFile] = useState(null)
    const [error, setError] = useState(null)
    const [preview, setPreview] = useState(null)
    const [loading, setLoading] = useState(false)
    const [prediction, setPrediction] = useState(null)
    const [confidence, setConfidence] = useState(null)
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
        setConfidence(null)
        setPrediction(null)
        setLoading(true);
        setError(null);

        const reader = new FileReader()

        reader.onloadend = async () => {
            // console.log(reader.result)
            const base64Image = reader.result; // data:image/jpeg;base64,...

            try {
            // Use environment variable or fallback to localhost
                const API_URL = import.meta.env.FASTAPI_BACKEND_API;
                const response = await fetch(`${API_URL}/predict`, {
                    method: 'POST',
                    headers:
                    {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ image: base64Image })
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                if (result.success) {
                    console.log(`This is result:`, result);
                    setPrediction(result.prediction);
                    setConfidence(result.confidence)
                } else {
                    setError(result.error);
                }
            } catch (err) {
                setError(`Error: ${err.message}`)
            } finally {
                setLoading(false);
            }
        }
        reader.readAsDataURL(imgFile);
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
                <button onClick={predictFood} disabled={!imgFile || loading} className='analyseBtn'>Analyse</button>
            </div>
            <div className="outputContainer">
                {loading && (
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
                )}
                {error && <p>{error}</p>}
                {prediction && (
                    <div className="resultContainer">
                        <div className="predPanel">
                            <div>The predicted food is ...</div>
                            <div style={{color:"red"}}>{prediction}</div>
                        </div>
                        <div className="confPanel">
                            <div>The confidence of this prediction is ...</div>
                            <div style={{color:"red"}}>{confidence * 100}%</div>
                        </div>
                    </div>
                )}
                {confidence && confidence < 0.5 && (
                    <div style={{"margin":"30px","border-bottom":"2px solid red"}}>
                       Confidence is low. Maybe it's correct, maybe it's not one of the 101 classes of food. Or is it even a food?
                    </div>)
                }
            </div>
        </>
    )
}