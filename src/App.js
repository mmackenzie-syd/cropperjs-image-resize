import logo from './logo.svg';
import './App.css';
import Cropper from "cropperjs";

function App() {

    const loadFile = (event) => {
        event.preventDefault();
        const largeImg = document.getElementById('large-img');
        const thbImg = document.getElementById('thb-img');
        if (largeImg) {
            largeImg.src = URL.createObjectURL(event.target.files[0]);
        }
    }

    const resizeImage = () => {
        const largeImg = document.getElementById('large-img');
        const cropper = new Cropper(largeImg, {
            zoomable: false,
            scalable: true,
            autoCropArea: 1,
            aspectRatio: 1,
            movable: false,
            autoCrop: true,
            ready: () => {
                cropper.getCroppedCanvas({
                    width: 200,
                    height: 200,
                    imageSmoothingEnabled: false,
                    imageSmoothingQuality: 'high',
                }).toBlob((blob) => {

                    const urlCreator = window.URL || window.webkitURL;
                    const thbImageUrl = urlCreator.createObjectURL(blob);
                    document.querySelector("#thb-img").src = thbImageUrl;
                    const thbImg = document.getElementById('thb-img');
                    thbImg.style.border = "4px solid #777";
                    // const formData = new FormData();
                    // Pass the image file name as the third parameter if necessary.
                    // formData.append('croppedImage', blob/*, 'example.png' */);
                }/*, 'image/png' */);
            }
        })
    }
    return (
        <div className="App">
            <h2>Image Upload</h2>
            <div className="input-wrap">
                <label htmlFor="file">Upload Image</label>
                <input
                    type="file"
                    accept="image/*"
                    name="image"
                    id="file"
                    onChange={loadFile}
                />
                <button onClick={resizeImage}>Resize Image</button>
            </div>
            <div className="img-wrap-large">
                <img id="large-img" />
                <div className="img-wrap-thb">
                    <img id="thb-img" />
                </div>
            </div>
        </div>
    );
}


export default App;


// https://github.com/fengyuanchen/cropperjs
// https://github.com/fengyuanchen/cropperjs#getcroppedcanvasoptions
// https://www.webtrickshome.com/faq/how-to-display-uploaded-image-in-html-using-javascript
// https://stackoverflow.com/questions/7650587/using-javascript-to-display-a-blob/44069294
