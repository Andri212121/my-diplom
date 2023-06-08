import s from './gamma.module.css'
import {useDispatch, useSelector} from "react-redux";
import {imageGammaAction, loadingAction, statusAction} from "../../../../store/imageReducer";
import axios from "axios";

let Gamma = () => {

    const dispatch = useDispatch()
    let feature = useSelector(state => state.feature)
    let status = useSelector(state => state.status)
    let featureCopy = JSON.parse(JSON.stringify(feature))

    let gamma = (gamma) => {
        dispatch(loadingAction())
        axios.put(`http://localhost:3001/imageEdit`, {
            ...featureCopy,
            gamma: gamma
        }, {responseType: 'arraybuffer'}).then(res => {
            dispatch(loadingAction())
            let image = btoa(
                new Uint8Array(res.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            dispatch(imageGammaAction({
                gamma: gamma,
                processedPhoto: `data:${`image/png`.toLowerCase()};base64,${image}`
            }))
        })
    }

    return(
        <div className={s.container}>
            <div className={s.title} style={status.gamma === true ? {background: "#3a3939"} : null}
                 onClick={() => {
                     dispatch(statusAction({...status, gamma: !status.gamma}))
                 }}>
                <div className={s.text}>
                    <img src={require('../../../../img/icon/gamma.png')} alt=""/>
                    <h2>
                        Gamma
                    </h2>
                </div>
                <div className={s.arrow}>
                    <img className={status.gamma === true ? s.arrowOpen : s.arrowClose}
                         src={require('../../../../img/icon/arrow-down-navigate.png')} alt=""/>
                </div>
            </div>
            <div className={status.gamma === true ? s.contentShow : s.contentParent}>
                <div className={s.inputBlock}>
                    <h3>
                        Gamma:
                    </h3>
                    <div className={s.input}>
                        <div className={s.minus}>
                            <button onClick={() => {
                                gamma(parseFloat((featureCopy.gamma - 0.1).toFixed(2)))
                            }}>-
                            </button>
                        </div>
                        <div className={s.inputField} onClick={() => {
                            gamma(parseFloat(prompt()))
                        }}>
                            <p>{featureCopy.gamma}</p>
                        </div>
                        <div className={s.plus}>
                            <button onClick={() => {
                                gamma(parseFloat((featureCopy.gamma + 0.1).toFixed(2)))
                            }}>+
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Gamma