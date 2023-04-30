import s from "./sideBar.module.css"
import {useState} from "react";
import Operation from "./component/operation/operation";
import Adjust from "./component/adjust/adjust";

let SideBar = (props) => {

    const [status, setStatus] = useState({
        crop: false,
        rotate: false
    })

    return (
        <div className={s.container}>
            <div className={s.chooseMenu}>
                <div className={s.select} onClick={() => {setStatus({...status, crop: true, rotate: false})}}>
                    <Operation selected={status.crop} status={status} setStatus={setStatus} title={"Crop"} img={require("../../img/icon/crop.png")}/>
                </div>
                <div className={s.select} onClick={() => {setStatus({...status, crop: false, rotate: true})}}>
                    <Operation selected={status.rotate} status={status} setStatus={setStatus} title={"Adjust"} img={require("../../img/icon/rotate.png")}/>
                </div>
            </div>
            <div className={s.menu}>
                {status.rotate && <Adjust setImg={props.setImg} img={props.img} history={props.history} setHistory={props.setHistory}/>}

           </div>
        </div>
    )
}

export default SideBar