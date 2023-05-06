import s from "./sideBar.module.css"
import {useState} from "react";
import RotateAndFlip from "./component/rotateAndFlip/rotateAndFlip";
import Affine from "./component/affine/affine";
import History from "./component/history/history";

let SideBar = (props) => {

    const [status, setStatus] = useState({
        rotateAndFlip: false,
        affine: false,
        history: false
    })

    return (
        <div className={s.container}>
            <div className={s.menu}>
                <div className={s.title}>
                    <img src={require('../../img/icon/adjust.png')} alt=""/>
                    <h2>
                        Adjust
                    </h2>
                </div>
                <RotateAndFlip setImg={props.setImg} img={props.img} history={props.history}
                               setHistory={props.setHistory} status={status} setStatus={setStatus}/>
                <Affine setImg={props.setImg} img={props.img} history={props.history} setHistory={props.setHistory}
                        status={status} setStatus={setStatus}/>
                <History setImg={props.setImg} img={props.img} history={props.history} setHistory={props.setHistory}
                         status={status} setStatus={setStatus}/>
            </div>
        </div>
    )
}

export default SideBar