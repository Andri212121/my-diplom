import s from './affine.module.css'
import axios from "axios";
import {imageAffineAction} from "../../../../store/imageReducer";
import {useDispatch, useSelector} from "react-redux";

let Affine = (props) => {

    const dispatch = useDispatch()
    let feature = useSelector(state => state.feature)
    let featureCopy = JSON.parse(JSON.stringify(feature))

    let affine = (affine) => {
        axios.put(`http://localhost:3001/imageEdit`, {...featureCopy, affine: affine}, { responseType: 'arraybuffer' }).then(res => {
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
                                        affine([[parseFloat((featureCopy.affine[0][0] - 0.01).toFixed(2)), featureCopy.affine[0][1]], [featureCopy.affine[1][0], featureCopy.affine[1][1]]])
                                    }}>-
                                    </button>
                                </div>
                                <input type="text" step={0.01} value={featureCopy.affine[0][0]}  onChange={e => {
                                    affine([[parseFloat(e.target.value), featureCopy.affine[0][1]], [featureCopy.affine[1][0], featureCopy.affine[1][1]]])
                                }}/>
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
                                <input type="number" step={0.01} value={featureCopy.affine[0][1]} onChange={e => {
                                    affine([[featureCopy.affine[0][0], parseFloat(e.target.value)], [featureCopy.affine[1][0], featureCopy.affine[1][1]]])
                                }}/>
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
                                <input type="number" step={0.01} value={featureCopy.affine[1][0]} onChange={e => {
                                    affine([[featureCopy.affine[0][0], featureCopy.affine[0][1]], [parseFloat(e.target.value), featureCopy.affine[1][1]]])
                                }}/>
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
                                <input type="number" step={0.01} value={featureCopy.affine[1][1]} onChange={e => {
                                    affine([[featureCopy.affine[0][0], featureCopy.affine[0][1]], [featureCopy.affine[1][0], parseFloat(e.target.value)]])
                                }}/>
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