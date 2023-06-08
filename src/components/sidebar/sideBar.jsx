import s from "./sideBar.module.css"
import {useState} from "react";
import RotateAndFlip from "./component/rotateAndFlip/rotateAndFlip";
import Affine from "./component/affine/affine";
import History from "./component/history/history";
import Sharpen from "./component/sharpen/sharpen";
import Median from "./component/median/median";
import Blur from "./component/blur/blur";
import Gamma from "./component/gamma/gamma";
import Negate from "./component/negate/negate";
import Normalise from "./component/normalise/normalise";

let SideBar = () => {




    return (
        <div className={s.container}>
            <div className={s.menu} style={{overflow: 'scroll', overflowX: 'hidden'}}>
                <div className={s.title}>
                    <img src={require('../../img/icon/adjust.png')} alt=""/>
                    <h2>
                        Adjust
                    </h2>
                </div>
                <RotateAndFlip/>
                <Affine/>
                <Sharpen/>
                <Median/>
                <Blur/>
                <Gamma/>
                <Negate/>
                <Normalise/>

                <History/>
            </div>
        </div>
    )
}

export default SideBar