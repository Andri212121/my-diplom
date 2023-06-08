import s from './negate.module.css'
import {useDispatch, useSelector} from "react-redux";
import {imageNegateAction, loadingAction, statusAction} from "../../../../store/imageReducer";
import axios from "axios";
import Switch from "react-switch";

let Negate = () => {

    const dispatch = useDispatch()
    let feature = useSelector(state => state.feature)
    let status = useSelector(state => state.status)
    let featureCopy = JSON.parse(JSON.stringify(feature))

    let negate = (negate) => {
        dispatch(loadingAction())
        axios.put(`http://localhost:3001/imageEdit`, {
            ...featureCopy,
            negate: negate
        }, {responseType: 'arraybuffer'}).then(res => {
            dispatch(loadingAction())
            let image = btoa(
                new Uint8Array(res.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            dispatch(imageNegateAction({
                negate: negate,
                processedPhoto: `data:${`image/png`.toLowerCase()};base64,${image}`
            }))
        })
    }

    return(
        <div className={s.container}>
            <div className={s.title} style={status.negate === true ? {background: "#3a3939"} : null}
                 onClick={() => {
                     dispatch(statusAction({...status, negate: !status.negate}))
                 }}>
                <div className={s.text}>
                    <img src={require('../../../../img/icon/negate.png')} alt=""/>
                    <h2>
                        Negate
                    </h2>
                </div>
                <div className={s.arrow}>
                    <img className={status.negate === true ? s.arrowOpen : s.arrowClose}
                         src={require('../../../../img/icon/arrow-down-navigate.png')} alt=""/>
                </div>
            </div>
            <div className={status.negate === true ? s.contentShow : s.contentParent}>
                <div className={s.inputBlock}>
                    <h3>
                        Negative:
                    </h3>
                    <div className={s.input}>
                        <Switch onChange={() => {negate(!feature.negate)}} checked={feature.negate} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Negate