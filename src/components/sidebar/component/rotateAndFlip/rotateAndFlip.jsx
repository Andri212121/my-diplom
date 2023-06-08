import s from './rotateAndFlip.module.css'
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {
    imageFlipAction,
    imageFlopAction,
    imageRotateAction,
    loadingAction,
    statusAction
} from "../../../../store/imageReducer";
import {useState} from "react";

let RotateAndFlip = () => {

    const [rotateA, setRotate] = useState(0)

    const dispatch = useDispatch()
    let feature = useSelector(state => state.feature)
    let status = useSelector(state => state.status)
    let featureCopy = JSON.parse(JSON.stringify(feature))

    let rotate = (angle) => {
        dispatch(loadingAction())
        axios.put(`http://localhost:3001/imageEdit`, {...featureCopy, rotate: featureCopy.rotate += angle}, { responseType: 'arraybuffer' }).then(res => {
            dispatch(loadingAction())
            let image = btoa(
                new Uint8Array(res.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            dispatch(imageRotateAction({
                angle: angle,
                processedPhoto: `data:${`image/png`.toLowerCase()};base64,${image}`
            }))
        })
    }

    let flip = () => {
        axios.put(`http://localhost:3001/imageEdit`, {...featureCopy, flip: featureCopy.flip = !featureCopy.flip}, { responseType: 'arraybuffer' }).then(res => {
            let image = btoa(
                new Uint8Array(res.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            dispatch(imageFlipAction({
                processedPhoto: `data:${`image/png`.toLowerCase()};base64,${image}`
            }))
        })
    }

    let flop = () => {
        axios.put(`http://localhost:3001/imageEdit?operation=flop`, {...featureCopy, flop: featureCopy.flop = !featureCopy.flop}, { responseType: 'arraybuffer' }).then(res => {
            let image = btoa(
                new Uint8Array(res.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            dispatch(imageFlopAction({
                processedPhoto: `data:${`image/png`.toLowerCase()};base64,${image}`
            }))
        })
    }

    return (
        <div className={s.rotateAndFlip}>
            <div className={s.title} style={status.rotateAndFlip === true ? {background: "#3a3939"} : null} onClick={() => {
                dispatch(statusAction({...status, rotateAndFlip: !status.rotateAndFlip}))
            }}>
                <div className={s.text}>
                    <img src={require('../../../../img/icon/rotate.png')} alt=""/>
                    <h2>
                        Rotate & flip
                    </h2>
                </div>
                <div className={s.arrow}>
                    <img className={status.rotateAndFlip === true ? s.arrowOpen : s.arrowClose}
                         src={require('../../../../img/icon/arrow-down-navigate.png')} alt=""/>

                </div>
            </div>
            <div className={status.rotateAndFlip === true ? s.contentShow : s.contentParent}>
                <div>
                    <button onClick={() => {rotate(-90)}}><img src={require('../../../../img/icon/rotate-left.png')} alt=""/></button>
                    <button onClick={() => {rotate(90)}}><img src={require('../../../../img/icon/rotate-right.png')} alt=""/></button>
                    <button onClick={() => {flop()}}><img src={require('../../../../img/icon/reflect-horizontal.png')} alt=""/></button>
                    <button onClick={() => {flip()}}><img src={require('../../../../img/icon/reflect-vertical.png')} alt=""/></button>
                </div>
               <div className={s.operation}>
                    <div className={s.rotateAngle}>
                        <p>
                            angle:
                        </p>
                        <p>
                            {rotateA}
                        </p>
                    </div>
                    <input type="range" min={'-45'} max={'45'} value={rotateA} onChange={e => {
                        setRotate(e.target.value)
                    }}
                           onMouseUp={() => {
                               rotate(parseInt(rotateA))
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