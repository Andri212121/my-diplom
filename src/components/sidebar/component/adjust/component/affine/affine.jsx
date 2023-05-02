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
            <div className={s.inputBlock}>
                <div className={s.brackets}>
                        [
                </div>
                <div className={s.buttonBlock}>
                    <div className={s.div1}>
                        <div className={s.input}>
                            <div className={s.minus}>
                                <button onClick={() => {setAffine([[parseFloat((affine[0][0]-0.01).toFixed(2)), affine[0][1]], [affine[1][0], affine[1][1]]])}}>-</button>
                            </div>
                            <input type="text" step={0.01} value={affine[0][0]} onChange={e => {setAffine([[parseFloat(e.target.value), affine[0][1]], [affine[1][0], affine[1][1]]])}}/>
                            <div className={s.plus}>
                                <button onClick={() => {setAffine([[parseFloat((affine[0][0]+0.01).toFixed(2)), affine[0][1]], [affine[1][0], affine[1][1]]])}}>+</button>
                            </div>
                        </div>
                    </div>
                    <div className={s.div2}>
                        <div className={s.input}>
                            <div className={s.minus}>
                                <button onClick={() => {setAffine([[affine[0][0], parseFloat((affine[0][1]-0.01).toFixed(2))], [affine[1][0], affine[1][1]]])}}>-</button>
                            </div>
                            <input type="number" step={0.01} value={affine[0][1]} onChange={e => {setAffine([[affine[0][0], parseFloat(e.target.value)], [affine[1][0], affine[1][1]]])}}/>
                            <div className={s.plus}>
                                <button onClick={() => {setAffine([[affine[0][0], parseFloat((affine[0][1]+0.01).toFixed(2))], [affine[1][0], affine[1][1]]])}}>+</button>
                            </div>
                        </div>
                    </div>
                    <div className={s.div3}>
                        <div className={s.input}>
                            <div className={s.minus}>
                                <button onClick={() => {setAffine([[affine[0][0], affine[0][1]], [parseFloat((affine[1][0]-0.01).toFixed(2)), affine[1][1]]])}}>-</button>
                            </div>
                            <input type="number" step={0.01} value={affine[1][0]} onChange={e => {setAffine([[affine[0][0], affine[0][1]], [parseFloat(e.target.value), affine[1][1]]])}}/>
                            <div className={s.plus}>
                                <button onClick={() => {setAffine([[affine[0][0], affine[0][1]], [parseFloat((affine[1][0]+0.01).toFixed(2)), affine[1][1]]])}}>+</button>
                            </div>
                        </div>
                    </div>
                    <div className={s.div4}>
                        <div className={s.input}>
                            <div className={s.minus}>
                                <button onClick={() => {setAffine([[affine[0][0], affine[0][1]], [affine[1][0], parseFloat((affine[1][1]-0.01).toFixed(2))]])}}>-</button>
                            </div>
                            <input type="number" step={0.01} value={affine[1][1]} onChange={e => {setAffine([[affine[0][0], affine[0][1]], [affine[1][0], parseFloat(e.target.value)]])}}/>
                            <div className={s.plus}>
                                <button onClick={() => {setAffine([[affine[0][0], affine[0][1]], [affine[1][0], parseFloat((affine[1][1]+0.01).toFixed(2))]])}}>+</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.brackets}>
                    ]
                </div>
            </div>
            <div className={s.confirm}>
                <button onClick={() => {affineAc()}}>button</button>
            </div>
        </div>
    )
}

export default Affine