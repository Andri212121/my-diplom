import s from "./rotate.module.css"
import {useState} from "react";
import axios from "axios";
import History from "../history/history";

let Rotate = (props) => {

    const [rotate, setRotate] = useState()
    const [affine, setAffine] = useState([[1, 0],[0, 1]])

    let rotateAc = () => {
        axios.put(`http://localhost:3001/imageEdit?operation=rotate&angle=`+rotate).then(res => {props.setImg({...props.img, crumbledImg: res.data})})
        props.setHistory([...props.history, {
            operation: "rotate",
            angle: rotate
        }])
    }

    let flipAc = () => {
        axios.put(`http://localhost:3001/imageEdit?operation=flip`).then(res => {props.setImg({...props.img, crumbledImg: res.data})})
        props.setHistory([...props.history, {
            operation: "flip"
        }])
    }

    let flopAc = () => {
        axios.put(`http://localhost:3001/imageEdit?operation=flop`).then(res => {props.setImg({...props.img, crumbledImg: res.data})})
        props.setHistory([...props.history, {
            operation: "flop"
        }])
    }

    let affineAc = () => {
        axios.put(`http://localhost:3001/imageEdit?operation=affine`, affine).then(res => {props.setImg({...props.img, crumbledImg: res.data})})
        props.setHistory([...props.history, {
            operation: "affine",
            affine: affine
        }])
    }

    return (
        <div className={s.container}>
            <h2>
                Rotate
            </h2>
            <div className={s.operation}>
                <input type="text" value={rotate} onChange={e => {setRotate(e.target.value)}}/>
                <input type="range" min={'0'} max={'360'} value={rotate} onChange={e => {setRotate(e.target.value)}}/>
                <button onClick={() => {rotateAc()}}>Виконати дію</button>
            </div>
            <h2>
                Flip
            </h2>
            <div className={s.operation}>
                <button onClick={() => {flipAc()}}>Виконати дію</button>
            </div>
            <h2>
                Flop
            </h2>
            <div className={s.operation}>
                <button onClick={() => {flopAc()}}>Виконати дію</button>
            </div>
            <h2>
                Affine
            </h2>
            <div className={s.operation}>
                <input type="number" step='0.01' value={affine[0][0]} onChange={e => {setAffine([[parseFloat(e.target.value), affine[0][1]], [affine[1][0], affine[1][1]]])}}/>
                <input type="number" step='0.01' value={affine[0][1]} onChange={e => {setAffine([[affine[0][0], parseFloat(e.target.value)], [affine[1][0], affine[1][1]]])}}/>
                <input type="number" step='0.01' value={affine[1][0]} onChange={e => {setAffine([[affine[0][0], affine[0][1]], [parseFloat(e.target.value), affine[1][1]]])}}/>
                <input type="number" step='0.01' value={affine[1][1]} onChange={e => {setAffine([[affine[0][0], affine[0][1]], [affine[1][0], parseFloat(e.target.value)]])}}/>

                <button onClick={() => {affineAc()}}>Виконати дію</button>
            </div>
            <div className={s.operation}>
                <History history={props.history}/>
            </div>
        </div>
    )
}

export default Rotate