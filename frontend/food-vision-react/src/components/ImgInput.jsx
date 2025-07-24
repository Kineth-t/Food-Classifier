import './ImgInput.css'

export default function ImgInput() {
    return (
        <div className="inputContainer">
            <h3>Upload an image file</h3>
            <input type="file" accept='image/jpg, image/png'/>
        </div>
    )
}