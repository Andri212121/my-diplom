import s from "./picPrew.module.css"
import {useState} from "react";
import axios from "axios";

let PicPrew = () => {

    const [image, setImage] = useState()

    let photoLoad = async (e) => {
        const file = e.target.files[0]
        const base64 = await convertBase64(file)
        setImage(base64)
        await axios.post('https://http://localhost:3001/postImage', {
            photo: base64
        })
    }

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    return (
        <div className={s.container}>
            <input type="file" accept="image/*" src="" alt="" onChange={e => {photoLoad(e)}}/>
        </div>
    )
}

export default PicPrew