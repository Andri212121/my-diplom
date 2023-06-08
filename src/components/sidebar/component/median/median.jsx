import s from './median.module.css'
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {imageMedianAction, loadingAction, statusAction} from "../../../../store/imageReducer";

let Median = () => {

    const dispatch = useDispatch()
    let feature = useSelector(state => state.feature)
    let status = useSelector(state => state.status)
    let featureCopy = JSON.parse(JSON.stringify(feature))

    let median = (median) => {
        dispatch(loadingAction())
        axios.put(`http://localhost:3001/imageEdit`, {
            ...featureCopy,
            median: median
        }, {responseType: 'arraybuffer'}).then(res => {
            dispatch(loadingAction())
            let image = btoa(
                new Uint8Array(res.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            dispatch(imageMedianAction({
                median: median,
                processedPhoto: `data:${`image/png`.toLowerCase()};base64,${image}`
            }))
        })
    }

    return (
        <div className={s.container}>
            <div className={s.title} style={status.median === true ? {background: "#3a3939"} : null}
                 onClick={() => {
                     dispatch(statusAction({...status, median: !status.median}))
                 }}>
                <div className={s.text}>
                    <img src={require('../../../../img/icon/median.png')} alt=""/>
                    <h2>
                        Median
                    </h2>
                </div>
                <div className={s.arrow}>
                    <img className={status.median === true ? s.arrowOpen : s.arrowClose}
                         src={require('../../../../img/icon/arrow-down-navigate.png')} alt=""/>
                </div>
            </div>
            <div className={status.median === true ? s.contentShow : s.contentParent}>
                <div className={s.inputBlock}>
                    <h3>
                        Mask size:
                    </h3>
                    <div className={s.input}>
                        <div className={s.minus}>
                            <button onClick={() => {
                                median(featureCopy.median - 1)
                            }}>-
                            </button>
                        </div>
                        <div className={s.inputField} onClick={() => {
                            median(parseFloat(prompt()))
                        }}>
                            <p>{featureCopy.median}</p>
                        </div>
                        <div className={s.plus}>
                            <button onClick={() => {
                                median(featureCopy.median + 1)
                            }}>+
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Median