import './ImgInput.css'

export default function ImgInput() {
    return (
        <div className="inputContainer">
            <h2>Upload an image file</h2>
            <input type="file" accept='image/*'/>
        </div>
    )
}