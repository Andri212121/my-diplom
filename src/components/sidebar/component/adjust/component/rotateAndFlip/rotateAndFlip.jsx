import s from './rotateAndFlip.module.css'
import axios from "axios";
import {useState} from "react";

let RotateAndFlip = (props) => {

    const [rotate, setRotate] = useState(0)

    let rotateAc = () => {
        axios.put(`http://localhost:3001/imageEdit?operation=rotate&angle=` + rotate).then(res => {
            props.setImg({...props.img, crumbledImg: res.data})
        })
        props.setHistory([...props.history, {
            operation: "rotate",
            angle: rotate
        }])
    }

    let flipAc = () => {
        axios.put(`http://localhost:3001/imageEdit?operation=flip`).then(res => {
            props.setImg({...props.img, crumbledImg: res.data})
        })
        props.setHistory([...props.history, {
            operation: "flip"
        }])
    }

    let flopAc = () => {
        axios.put(`http://localhost:3001/imageEdit?operation=flop`).then(res => {
            props.setImg({...props.img, crumbledImg: res.data})
        })
        props.setHistory([...props.history, {
            operation: "flop"
        }])
    }

    return (
        <div className={s.rotateAndFlip}>
            <div className={s.title} style={props.status.rotateAndFlip === true ? {background: "#3a3939"} : null} onClick={() => {
                props.setStatus({...props.status, rotateAndFlip: !props.status.rotateAndFlip})
            }}>
                <div className={s.text}>
                    <img src={require('../../../../../../img/icon/rotate.png')} alt=""/>
                    <h2>
                        Rotate & flip
                    </h2>
                </div>
                <div className={s.arrow}>
                    <img className={props.status.rotateAndFlip === true ? s.arrowOpen : s.arrowClose}
                         src={require('../../../../../../img/icon/arrow-down-navigate.png')} alt=""/>

                </div>
            </div>
            <div className={props.status.rotateAndFlip === true ? s.contentShow : s.contentParent}>
                <button><img src={require('./../../../../../../img/icon/rotate-left.png')} onClick={() => {axios.put(`http://localhost:3001/imageEdit?operation=rotate&angle=` + 270).then(res => {
                    props.setImg({...props.img, crumbledImg: res.data})
                })}} alt=""/></button>
                <button><img src={require('./../../../../../../img/icon/rotate-right.png')} onClick={() => {axios.put(`http://localhost:3001/imageEdit?operation=rotate&angle=` + 90).then(res => {
                    props.setImg({...props.img, crumbledImg: res.data})
                })}} alt=""/></button>
                <button><img src={require('./../../../../../../img/icon/reflect-horizontal.png')} onClick={() => {axios.put(`http://localhost:3001/imageEdit?operation=flop`).then(res => {
                    props.setImg({...props.img, crumbledImg: res.data})
                })}} alt=""/></button>
                <button><img src={require('./../../../../../../img/icon/reflect-vertical.png')} onClick={() => {axios.put(`http://localhost:3001/imageEdit?operation=flip`).then(res => {
                    props.setImg({...props.img, crumbledImg: res.data})
                })}} alt=""/></button>
                <div className={s.operation}>
                    <div className={s.rotateAngle}>
                        <p>
                            angle:
                        </p>
                        <p>
                            {rotate}
                        </p>
                    </div>
                    <input type="range" min={'-45'} max={'45'} value={rotate} onChange={e => {
                        setRotate(e.target.value)
                    }}
                           onMouseUp={() => {
                               axios.put(`http://localhost:3001/imageEdit?operation=rotate&angle=` + rotate).then(res => {
                                   props.setImg({...props.img, crumbledImg: res.data})
                               })
                               setRotate(0)
                           }
                           }
                    />
                </div>
            </div>
        </div>
    )
}

export default RotateAndFlip