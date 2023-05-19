import s from "./picPrew.module.css"

import {useDispatch, useSelector} from "react-redux";
import {imageUploadAction} from "../../store/imageReducer";
let PicPrew = () => {

    const dispatch = useDispatch()
    const processedPhoto = useSelector(state => state.photo.processedPhoto)
    const unProcessedPhoto = useSelector(state => state.photo.unProcessedPhoto)

    let photoUpload = (image) => {
        let img = new Image()
        img.src = URL.createObjectURL(image.target.files[0])
        img.onload = async function () {
            const formData = new FormData()
                        formData.append('file', image.target.files[0])
                        await fetch('http://localhost:3001/imagePost', {
                            method: 'PUT',
                            body: formData
                        })
            dispatch(imageUploadAction({
                image: image,
                width: img.width,
                height: img.height
            }))
        }
    }

    return (
        <div className={s.container}>
            {unProcessedPhoto === null && <input disabled={false} type="file" accept="image/*" src="" alt="" onChange={e => {photoUpload(e)}}/>}
            {unProcessedPhoto !== null && <img src={URL.createObjectURL(unProcessedPhoto)} alt=""/>}
            {processedPhoto !== null && <img src={processedPhoto} alt=""/>}
        </div>
    )
}

export default PicPrew