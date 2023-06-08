import s from './blur.module.css'
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {imageBlurAction, loadingAction, statusAction} from "../../../../store/imageReducer";

let Blur = () => {

    const dispatch = useDispatch()
    let feature = useSelector(state => state.feature)
    let status = useSelector(state => state.status)
    let featureCopy = JSON.parse(JSON.stringify(feature))

    let blur = (blur) => {
        dispatch(loadingAction())
        axios.put(`http://localhost:3001/imageEdit`, {
            ...featureCopy,
            blur: blur
        }, {responseType: 'arraybuffer'}).then(res => {
            dispatch(loadingAction())
            let image = btoa(
                new Uint8Array(res.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            dispatch(imageBlurAction({
                blur: blur,
                processedPhoto: `data:${`image/png`.toLowerCase()};base64,${image}`
            }))
        })
    }

    return (
        <div className={s.container}>
            <div className={s.title} style={status.blur === true ? {background: "#3a3939"} : null}
                 onClick={() => {
                     dispatch(statusAction({...status, blur: !status.blur}))
                 }}>
                <div className={s.text}>
                    <img src={require('../../../../img/icon/blur.png')} alt=""/>
                    <h2>
                        Blur
                    </h2>
                </div>
                <div className={s.arrow}>
                    <img className={status.blur === true ? s.arrowOpen : s.arrowClose}
                         src={require('../../../../img/icon/arrow-down-navigate.png')} alt=""/>
                </div>
            </div>
            <div className={status.blur === true ? s.contentShow : s.contentParent}>
                <div className={s.inputBlock}>
                    <h3>
                        Sigma:
                    </h3>
                    <div className={s.input}>
                        <div className={s.minus}>
                            <button onClick={() => {
                                blur(featureCopy.blur - 1)
                            }}>-
                            </button>
                        </div>
                        <div className={s.inputField} onClick={() => {
                            blur(parseFloat(prompt()))
                        }}>
                            <p>{featureCopy.blur}</p>
                        </div>
                        <div className={s.plus}>
                            <button onClick={() => {
                                blur(featureCopy.blur + 1)
                            }}>+
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Blur