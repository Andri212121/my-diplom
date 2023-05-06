import s from './affine.module.css'
import {useState} from "react";
import axios from "axios";

let Affine = (props) => {

    const [affine, setAffine] = useState([[1, 0], [0, 1]])

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
            <div className={s.title} style={props.status.affine === true ? {background: "#3a3939"} : null}
                 onClick={() => {
                     props.setStatus({...props.status, affine: !props.status.affine})
                 }}>
                <div className={s.text}>
                    <img src={require('../../../../img/icon/affine.png')} alt=""/>
                    <h2>
                        Affine transform
                    </h2>
                </div>
                <div className={s.arrow}>
                    <img className={props.status.affine === true ? s.arrowOpen : s.arrowClose}
                         src={require('../../../../img/icon/arrow-down-navigate.png')} alt=""/>

                </div>
            </div>
            <div className={props.status.affine === true ? s.contentShow : s.contentParent}>
                <div className={s.inputBlock}>
                    <div className={s.brackets}>
                        [
                    </div>
                    <div className={s.buttonBlock}>
                        <div className={s.div1}>
                            <div className={s.input}>
                                <div className={s.minus}>
                                    <button onClick={() => {
                                        setAffine([[parseFloat((affine[0][0] - 0.01).toFixed(2)), affine[0][1]], [affine[1][0], affine[1][1]]])
                                    }}>-
                                    </button>
                                </div>
                                <input type="text" step={0.01} value={affine[0][0]} onChange={e => {
                                    setAffine([[parseFloat(e.target.value), affine[0][1]], [affine[1][0], affine[1][1]]])
                                }}/>
                                <div className={s.plus}>
                                    <button onClick={() => {
                                        setAffine([[parseFloat((affine[0][0] + 0.01).toFixed(2)), affine[0][1]], [affine[1][0], affine[1][1]]])
                                    }}>+
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={s.div2}>
                            <div className={s.input}>
                                <div className={s.minus}>
                                    <button onClick={() => {
                                        setAffine([[affine[0][0], parseFloat((affine[0][1] - 0.01).toFixed(2))], [affine[1][0], affine[1][1]]])
                                    }}>-
                                    </button>
                                </div>
                                <input type="number" step={0.01} value={affine[0][1]} onChange={e => {
                                    setAffine([[affine[0][0], parseFloat(e.target.value)], [affine[1][0], affine[1][1]]])
                                }}/>
                                <div className={s.plus}>
                                    <button onClick={() => {
                                        setAffine([[affine[0][0], parseFloat((affine[0][1] + 0.01).toFixed(2))], [affine[1][0], affine[1][1]]])
                                    }}>+
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={s.div3}>
                            <div className={s.input}>
                                <div className={s.minus}>
                                    <button onClick={() => {
                                        setAffine([[affine[0][0], affine[0][1]], [parseFloat((affine[1][0] - 0.01).toFixed(2)), affine[1][1]]])
                                    }}>-
                                    </button>
                                </div>
                                <input type="number" step={0.01} value={affine[1][0]} onChange={e => {
                                    setAffine([[affine[0][0], affine[0][1]], [parseFloat(e.target.value), affine[1][1]]])
                                }}/>
                                <div className={s.plus}>
                                    <button onClick={() => {
                                        setAffine([[affine[0][0], affine[0][1]], [parseFloat((affine[1][0] + 0.01).toFixed(2)), affine[1][1]]])
                                    }}>+
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={s.div4}>
                            <div className={s.input}>
                                <div className={s.minus}>
                                    <button onClick={() => {
                                        setAffine([[affine[0][0], affine[0][1]], [affine[1][0], parseFloat((affine[1][1] - 0.01).toFixed(2))]])
                                    }}>-
                                    </button>
                                </div>
                                <input type="number" step={0.01} value={affine[1][1]} onChange={e => {
                                    setAffine([[affine[0][0], affine[0][1]], [affine[1][0], parseFloat(e.target.value)]])
                                }}/>
                                <div className={s.plus}>
                                    <button onClick={() => {
                                        setAffine([[affine[0][0], affine[0][1]], [affine[1][0], parseFloat((affine[1][1] + 0.01).toFixed(2))]])
                                    }}>+
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={s.brackets}>
                        ]
                    </div>
                </div>
                <div className={s.confirm}>
                    <button onClick={() => {
                        affineAc()
                    }}>Transform
                    </button>
                </div>
            </div>


        </div>
    )
}

export default Affine