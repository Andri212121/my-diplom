import s from './normalise.module.css'
import {useDispatch, useSelector} from "react-redux";
import {imageNormaliseAction, loadingAction, statusAction} from "../../../../store/imageReducer";
import axios from "axios";
import Switch from "react-switch";

let Normalise = () => {

    const dispatch = useDispatch()
    let feature = useSelector(state => state.feature)
    let status = useSelector(state => state.status)
    let featureCopy = JSON.parse(JSON.stringify(feature))

    let normalise = (normalise) => {
        dispatch(loadingAction())
        axios.put(`http://localhost:3001/imageEdit`, {
            ...featureCopy,
            normalise: normalise
        }, {responseType: 'arraybuffer'}).then(res => {
            dispatch(loadingAction())
            let image = btoa(
                new Uint8Array(res.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            dispatch(imageNormaliseAction({
                normalise: normalise,
                processedPhoto: `data:${`image/png`.toLowerCase()};base64,${image}`
            }))
        })
    }

    return(
        <div className={s.container}>
            <div className={s.title} style={status.normalise === true ? {background: "#3a3939"} : null}
                 onClick={() => {
                     dispatch(statusAction({...status, normalise: !status.normalise}))
                 }}>
                <div className={s.text}>
                    <img src={require('../../../../img/icon/normalise.png')} alt=""/>
                    <h2>
                        Normalise
                    </h2>
                </div>
                <div className={s.arrow}>
                    <img className={status.normalise === true ? s.arrowOpen : s.arrowClose}
                         src={require('../../../../img/icon/arrow-down-navigate.png')} alt=""/>
                </div>
            </div>
            <div className={status.normalise === true ? s.contentShow : s.contentParent}>
                <div className={s.inputBlock}>
                    <h3>
                        Normalise:
                    </h3>
                    <div className={s.input}>
                        <Switch onChange={() => {normalise({...feature.normalise, status:!feature.normalise.status})}} checked={feature.normalise.status} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Normalise