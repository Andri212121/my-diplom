import s from "./sideBar.module.css"
import axios from "axios";
import {useState} from "react";

let SideBar = (props) => {

    const [rotate, setRotate] = useState()

    return (
        <div className={s.container}>
            <div className={s.chooseMenu}>

            </div>
            <div className={s.menu}>
                <button onClick={() => {axios.get(`http://localhost:3001/imageEdit?angle=`+rotate).then(res => {props.setImg({...props.img, crumbledImg: res.data})})}}>8797987</button>
                <input type="text" value={rotate} onChange={e => {setRotate(e.target.value)}}/>
            </div>
        </div>
    )
}

export default SideBar