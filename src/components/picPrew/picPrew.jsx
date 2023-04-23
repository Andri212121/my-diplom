import s from "./picPrew.module.css"
import {useState} from "react";

let PicPrew = (props) => {

    const [status, setStatus] = useState()
console.log(props)
    let photoLoad = async (e) => {
        if (e.target.files[0]) {
            props.setImg({...props.img, prew: e.target.files[0]})
            const formData = new FormData()
            formData.append('file', e.target.files[0])
            await fetch('http://localhost:3001/imagePost', {
                method: 'PUT',
                body: formData
            })
        }
    }

    return (
        <div className={s.container}>
            {!props.img.prew && <input disabled={false} type="file" accept="image/*" src="" alt="" onChange={e => {photoLoad(e)}}/>}
            {(props.img.prew && !props.img.crumbledImg) &&
                <div className={s.prewImg}>
                    <img src={ URL.createObjectURL(props.img.prew)} alt=""/>
                </div>
            }
            {props.img.crumbledImg &&
                <div className={s.prewImg}>
                    <img style={{border: "solid 1px #000000"}} src={require("./../../data/outImg.png")} alt=""/>
                </div>
            }
        </div>
    )
}

export default PicPrew