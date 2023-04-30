import s from "./adjust.module.css"
import {useState} from "react";
import axios from "axios";
import History from "../history/history";
import RotateAndFlip from "./component/rotateAndFlip/rotateAndFlip";

let Adjust = (props) => {

    const [rotate, setRotate] = useState(0)
    const [affine, setAffine] = useState([[1, 0], [0, 1]])
    const [status, setStatus] = useState({
        rotateAndFlip: false
    })

    let affineAc = () => {
        axios.put(`http://localhost:3001/imageEdit?operation=affine`, affine).then(res => {
            props.setImg({...props.img, crumbledImg: res.data})
        })
        props.setHistory([...props.history, {
            operation: "affine",
            affine: affine
        }])
    }

    return (
        <div className={s.container}>
            <h1>
                Size
            </h1>
            <RotateAndFlip setImg={props.setImg} img={props.img} history={props.history} setHistory={props.setHistory} status={status} setStatus={setStatus}/>
            <h2>
                Affine
            </h2>
            <div className={s.operation}>
                <input type="number" step='0.01' value={affine[0][0]} onChange={e => {
                    setAffine([[parseFloat(e.target.value), affine[0][1]], [affine[1][0], affine[1][1]]])
                }}/>
                <input type="number" step='0.01' value={affine[0][1]} onChange={e => {
                    setAffine([[affine[0][0], parseFloat(e.target.value)], [affine[1][0], affine[1][1]]])
                }}/>
                <input type="number" step='0.01' value={affine[1][0]} onChange={e => {
                    setAffine([[affine[0][0], affine[0][1]], [parseFloat(e.target.value), affine[1][1]]])
                }}/>
                <input type="number" step='0.01' value={affine[1][1]} onChange={e => {
                    setAffine([[affine[0][0], affine[0][1]], [affine[1][0], parseFloat(e.target.value)]])
                }}/>

                <button onClick={() => {
                    affineAc()
                }}>Виконати дію
                </button>
            </div>
            <div className={s.operation}>
                <History history={props.history}/>
            </div>
        </div>
    )
}

export default Adjust