import s from "./adjust.module.css"
import {useState} from "react";
import axios from "axios";
import History from "../history/history";
import RotateAndFlip from "./component/rotateAndFlip/rotateAndFlip";
import Affine from "./component/affine/affine";

let Adjust = (props) => {

    const [rotate, setRotate] = useState(0)
    const [affine, setAffine] = useState([[1, 0], [0, 1]])
    const [status, setStatus] = useState({
        rotateAndFlip: false
    })

    return (
        <div className={s.container}>
            <h1>
                Size
            </h1>
            <RotateAndFlip setImg={props.setImg} img={props.img} history={props.history} setHistory={props.setHistory} status={status} setStatus={setStatus}/>
            <Affine setImg={props.setImg} img={props.img} history={props.history} setHistory={props.setHistory} status={status} setStatus={setStatus}/>

            <div className={s.operation}>
                <History history={props.history}/>
            </div>
        </div>
    )
}

export default Adjust