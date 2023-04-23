import s from "./rotate.module.css"
import {useState} from "react";
import axios from "axios";

let Rotate = (props) => {

    const [rotate, setRotate] = useState()

    return (
        <div className={s.container}>
            <h2>
                Rotate
            </h2>
            <div className={s.operation}>
                <input type="text" value={rotate} onChange={e => {setRotate(e.target.value)}}/>
                <input type="range" min={'0'} max={'360'} value={rotate} onChange={e => {setRotate(e.target.value)}}/>
                <button onClick={() => {axios.get(`http://localhost:3001/imageEdit?operation=rotate&angle=`+rotate).then(res => {props.setImg({...props.img, crumbledImg: res.data})})}}>Виконати дію</button>
            </div>
            <h2>
                Flip
            </h2>
            <div className={s.operation}>
                <button onClick={() => {axios.get(`http://localhost:3001/imageEdit?operation=flip`).then(res => {props.setImg({...props.img, crumbledImg: res.data})})}}>Виконати дію</button>
            </div>
            <h2>
                Flop
            </h2>
            <div className={s.operation}>
                <button onClick={() => {axios.get(`http://localhost:3001/imageEdit?operation=flop`).then(res => {props.setImg({...props.img, crumbledImg: res.data})})}}>Виконати дію</button>
            </div>
            <h2>
                Save
            </h2>
            <div className={s.operation}>
                <button onClick={() => {axios.get(`http://localhost:3001/imageEdit?operation=save`).then(res => {props.setImg({...props.img, crumbledImg: res.data})})}}>Зберегти</button>
            </div>
        </div>
    )
}

export default Rotate