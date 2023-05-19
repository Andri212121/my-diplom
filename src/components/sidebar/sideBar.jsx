import s from "./sideBar.module.css"
import {useState} from "react";
import RotateAndFlip from "./component/rotateAndFlip/rotateAndFlip";
import Affine from "./component/affine/affine";
import History from "./component/history/history";
import Sharpen from "./component/sharpen/sharpen";
import axios from "axios";

let SideBar = (props) => {


    const [status, setStatus] = useState({
        rotateAndFlip: false,
        affine: false,
        history: false,
        sharpen: false
    })

    // const [img, setImg] = useState()

    return (
        <div className={s.container}>
            <div className={s.menu}>
                <div className={s.title}>
                    <img src={require('../../img/icon/adjust.png')} alt=""/>
                    <h2>
                        Adjust
                    </h2>
                </div>
                <RotateAndFlip status={status} setStatus={setStatus}/>
                <Affine status={status} setStatus={setStatus}/>
                <Sharpen status={status} setStatus={setStatus}/>
                <History status={status} setStatus={setStatus}/>
            </div>
        </div>
    )
}

export default SideBar