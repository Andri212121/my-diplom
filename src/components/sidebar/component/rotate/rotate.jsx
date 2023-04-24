import s from "./rotate.module.css"
import {useState} from "react";
import axios from "axios";

let Rotate = (props) => {

    const [rotate, setRotate] = useState()
    const [affine, setAffine] = useState([[1, 0],[0, 1]])

    console.log(affine)

    return (
        <div className={s.container}>
            <h2>
                Rotate
            </h2>
            <div className={s.operation}>
                <input type="text" value={rotate} onChange={e => {setRotate(e.target.value)}}/>
                <input type="range" min={'0'} max={'360'} value={rotate} onChange={e => {setRotate(e.target.value)}}/>
                <button onClick={() => {axios.put(`http://localhost:3001/imageEdit?operation=rotate&angle=`+rotate).then(res => {props.setImg({...props.img, crumbledImg: res.data})})}}>Виконати дію</button>
            </div>
            <h2>
                Flip
            </h2>
            <div className={s.operation}>
                <button onClick={() => {axios.put(`http://localhost:3001/imageEdit?operation=flip`).then(res => {props.setImg({...props.img, crumbledImg: res.data})})}}>Виконати дію</button>
            </div>
            <h2>
                Flop
            </h2>
            <div className={s.operation}>
                <button onClick={() => {axios.put(`http://localhost:3001/imageEdit?operation=flop`).then(res => {props.setImg({...props.img, crumbledImg: res.data})})}}>Виконати дію</button>
            </div>
            <h2>
                Affine
            </h2>
            <div className={s.operation}>
                <input type="number" step='0.01' value={affine[0][0]} onChange={e => {setAffine([[parseFloat(e.target.value), affine[0][1]], [affine[1][0], affine[1][1]]])}}/>
                <input type="number" step='0.01' value={affine[0][1]} onChange={e => {setAffine([[affine[0][0], parseFloat(e.target.value)], [affine[1][0], affine[1][1]]])}}/>
                <input type="number" step='0.01' value={affine[1][0]} onChange={e => {setAffine([[affine[0][0], affine[0][1]], [parseFloat(e.target.value), affine[1][1]]])}}/>
                <input type="number" step='0.01' value={affine[1][1]} onChange={e => {setAffine([[affine[0][0], affine[0][1]], [affine[1][0], parseFloat(e.target.value)]])}}/>

                <button onClick={() => {axios.put(`http://localhost:3001/imageEdit?operation=affine`, affine).then(res => {props.setImg({...props.img, crumbledImg: res.data})})}}>Виконати дію</button>
            </div>
            <h2>
                Save
            </h2>
            <div className={s.operation}>
                <button onClick={() => {axios.put(`http://localhost:3001/imageEdit?operation=save`).then(res => {props.setImg({...props.img, crumbledImg: res.data})})}}>Зберегти</button>
            </div>
        </div>
    )
}

export default Rotate