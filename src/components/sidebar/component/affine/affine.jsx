import s from './affine.module.css'
import axios from "axios";
import {imageAffineAction, loadingAction, statusAction} from "../../../../store/imageReducer";
import {useDispatch, useSelector} from "react-redux";

let Affine = () => {

    const dispatch = useDispatch()
    let feature = useSelector(state => state.feature)
    let status = useSelector(state => state.status)
    let featureCopy = JSON.parse(JSON.stringify(feature))

    let affine = (affine) => {
        dispatch(loadingAction())
        axios.put(`http://localhost:3001/imageEdit`, {
            ...featureCopy,
            affine: affine
        }, {responseType: 'arraybuffer'}).then(res => {
            dispatch(loadingAction())
            let image = btoa(
                new Uint8Array(res.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            dispatch(imageAffineAction({
                affine: affine,
                processedPhoto: `data:${`image/png`.toLowerCase()};base64,${image}`
            }))
        })
    }

    return (
        <div className={s.container}>
            <div className={s.title} style={status.affine === true ? {background: "#3a3939"} : null}
                 onClick={() => {
                     dispatch(statusAction({...status, affine: !status.affine}))
                 }}>
                <div className={s.text}>
                    <img src={require('../../../../img/icon/affine.png')} alt=""/>
                    <h2>
                        Affine transform
                    </h2>
                </div>
                <div className={s.arrow}>
                    <img className={status.affine === true ? s.arrowOpen : s.arrowClose}
                         src={require('../../../../img/icon/arrow-down-navigate.png')} alt=""/>

                </div>
            </div>
            <div className={status.affine === true ? s.contentShow : s.contentParent}>
                <div className={s.inputBlock}>
                    <div className={s.brackets}>
                        [
                    </div>
                    <div className={s.buttonBlock}>
                        <div className={s.div1}>
                            <div className={s.input}>
                                <div className={s.minus}>
                                    <button onClick={() => {
                                        affine([[parseFloat((featureCopy.affine[0][0] - 0.01).toFixed(2)), featureCopy.affine[0][1]], [featureCopy.affine[1][0], featureCopy.affine[1][1]]])
                                    }}>-
                                    </button>
                                </div>
                                <div className={s.inputField} onClick={() => {
                                    affine([[parseFloat(prompt()), featureCopy.affine[0][1]], [featureCopy.affine[1][0], featureCopy.affine[1][1]]])
                                }}>
                                    <p>{featureCopy.affine[0][0]}</p>
                                </div>
                                <div className={s.plus}>
                                    <button onClick={() => {
                                        affine([[parseFloat((featureCopy.affine[0][0] + 0.01).toFixed(2)), featureCopy.affine[0][1]], [featureCopy.affine[1][0], featureCopy.affine[1][1]]])
                                    }}>+
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={s.div2}>
                            <div className={s.input}>
                                <div className={s.minus}>
                                    <button onClick={() => {
                                        affine([[featureCopy.affine[0][0], parseFloat((featureCopy.affine[0][1] - 0.01).toFixed(2))], [featureCopy.affine[1][0], featureCopy.affine[1][1]]])
                                    }}>-
                                    </button>
                                </div>
                                <div className={s.inputField} onClick={() => {
                                    affine([[featureCopy.affine[0][0], parseFloat(prompt())], [featureCopy.affine[1][0], featureCopy.affine[1][1]]])
                                }}>
                                    <p>{featureCopy.affine[0][1]}</p>
                                </div>
                                <div className={s.plus}>
                                    <button onClick={() => {
                                        affine([[featureCopy.affine[0][0], parseFloat((featureCopy.affine[0][1] + 0.01).toFixed(2))], [featureCopy.affine[1][0], featureCopy.affine[1][1]]])
                                    }}>+
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={s.div3}>
                            <div className={s.input}>
                                <div className={s.minus}>
                                    <button onClick={() => {
                                        affine([[featureCopy.affine[0][0], featureCopy.affine[0][1]], [parseFloat((featureCopy.affine[1][0] - 0.01).toFixed(2)), featureCopy.affine[1][1]]])
                                    }}>-
                                    </button>
                                </div>
                                <div className={s.inputField} onClick={() => {
                                    affine([[featureCopy.affine[0][0], featureCopy.affine[0][1]], [parseFloat(prompt()), featureCopy.affine[1][1]]])
                                }}>
                                    <p>{featureCopy.affine[1][0]}</p>
                                </div>
                                <div className={s.plus}>
                                    <button onClick={() => {
                                        affine([[featureCopy.affine[0][0], featureCopy.affine[0][1]], [parseFloat((featureCopy.affine[1][0] + 0.01).toFixed(2)), featureCopy.affine[1][1]]])
                                    }}>+
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={s.div4}>
                            <div className={s.input}>
                                <div className={s.minus}>
                                    <button onClick={() => {
                                        affine([[featureCopy.affine[0][0], featureCopy.affine[0][1]], [featureCopy.affine[1][0], parseFloat((featureCopy.affine[1][1] - 0.01).toFixed(2))]])
                                    }}>-
                                    </button>
                                </div>
                                <div className={s.inputField} onClick={() => {
                                    affine([[featureCopy.affine[0][0], featureCopy.affine[0][1]], [featureCopy.affine[1][0], parseFloat(prompt())]])
                                }}>
                                    <p>{featureCopy.affine[1][1]}</p>
                                </div>
                                <div className={s.plus}>
                                    <button onClick={() => {
                                        affine([[featureCopy.affine[0][0], featureCopy.affine[0][1]], [featureCopy.affine[1][0], parseFloat((featureCopy.affine[1][1] + 0.01).toFixed(2))]])
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
            </div>
        </div>
    )
}

export default Affine