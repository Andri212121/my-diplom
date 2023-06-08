import s from './sharpen.module.css'
import axios from "axios";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {imageSharpenAction, loadingAction, statusAction} from "../../../../store/imageReducer";

let Sharpen = () => {

    const dispatch = useDispatch()
    let feature = useSelector(state => state.feature)
    let status = useSelector(state => state.status)
    let featureCopy = JSON.parse(JSON.stringify(feature))

    let sharpen = (sharpen) => {
        dispatch(loadingAction())
        axios.put(`http://localhost:3001/imageEdit`, {
            ...featureCopy,
            sharpen: sharpen
        }, {responseType: 'arraybuffer'}).then(res => {
            dispatch(loadingAction())
            let image = btoa(
                new Uint8Array(res.data)
                    .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
            dispatch(imageSharpenAction({
                sharpen: sharpen,
                processedPhoto: `data:${`image/png`.toLowerCase()};base64,${image}`
            }))
        })
    }

    const [tipStatus, setTipStatus] = useState({
        sigma: false,
        m1: false,
        m2: false,
        x1: false,
        y2: false,
        y3: false,
        sigmaCase: false,
        m1Case: false,
        m2Case: false,
        x1Case: false,
        y2Case: false,
        y3Case: false
    })

    return (
        <div className={s.container}>
            <div className={s.title} style={status.sharpen === true ? {background: "#3a3939"} : null}
                 onClick={() => {
                     dispatch(statusAction({...status, sharpen: !status.sharpen}))
                 }}>
                <div className={s.text}>
                    <img src={require('../../../../img/icon/sharpen.png')} alt=""/>
                    <h2>
                        Sharpen
                    </h2>
                </div>
                <div className={s.arrow}>
                    <img className={status.sharpen === true ? s.arrowOpen : s.arrowClose}
                         src={require('../../../../img/icon/arrow-down-navigate.png')} alt=""/>

                </div>
            </div>
            <div className={status.sharpen === true ? s.contentShow : s.contentParent}>
                <div className={s.inputBlock} onMouseEnter={() => setTipStatus({
                    ...tipStatus,
                    sigmaCase: false,
                    sigma: true,
                    m1: false,
                    m2: false,
                    x1: false,
                    y2: false,
                    y3: false
                })} onMouseLeave={() => setTipStatus({
                    ...tipStatus,
                    sigmaCase: false,
                    sigma: false,
                    m1: false,
                    m2: false,
                    x1: false,
                    y2: false,
                    y3: false
                })}>
                    <h3>
                        Sigma:
                    </h3>
                    <div className={s.input}>
                        <div className={s.minus}>
                            <button onClick={() => {
                                sharpen({...featureCopy.sharpen, sigma: featureCopy.sharpen.sigma - 0.5})
                            }}>-
                            </button>
                        </div>
                        <div className={s.inputField} onClick={() => {
                            sharpen({...featureCopy.sharpen, sigma: parseFloat(prompt())})
                        }}>
                            <p>
                                {featureCopy.sharpen.sigma}
                            </p>
                        </div>
                        <div className={s.plus}>
                            <button onClick={() => {
                                sharpen({...featureCopy.sharpen, sigma: featureCopy.sharpen.sigma + 0.5})
                            }}>+
                            </button>
                        </div>
                        <div className={tipStatus.sigma ? s.infoShow : s.infoHide}
                             onMouseEnter={() => setTipStatus({
                                 ...tipStatus,
                                 sigmaCase: true,
                                 m1Case: false,
                                 m2Case: false,
                                 x1Case: false,
                                 y2Case: false,
                                 y3Case: false
                             })} onMouseLeave={() => setTipStatus({
                            ...tipStatus,
                            sigmaCase: false,
                            m1Case: false,
                            m2Case: false,
                            x1Case: false,
                            y2Case: false,
                            y3Case: false
                        })}>
                            ?
                        </div>
                        <div className={tipStatus.sigmaCase && tipStatus.sigma ? s.infoCaseShow : s.infoCaseHide}>
                            the sigma of the Gaussian mask, where sigma = 1 + radius / 2, between 0.000001 and 10
                        </div>
                    </div>
                </div>
                <div className={s.inputBlock} onMouseEnter={() => setTipStatus({
                    ...tipStatus,
                    m1Case: false,
                    sigma: false,
                    m1: true,
                    m2: false,
                    x1: false,
                    y2: false,
                    y3: false
                })}
                     onMouseLeave={() => setTipStatus({
                         ...tipStatus,
                         m1Case: false,
                         sigma: false,
                         m1: false,
                         m2: false,
                         x1: false,
                         y2: false,
                         y3: false
                     })}>
                    <h3>
                        m1:
                    </h3>
                    <div className={s.input}>
                        <div className={s.minus}>
                            <button onClick={() => {
                                sharpen({...featureCopy.sharpen, m1: featureCopy.sharpen.m1 - 0.5})
                            }}>-
                            </button>
                        </div>
                        <div className={s.inputField} onClick={() => {
                            sharpen({...featureCopy.sharpen, m1: parseFloat(prompt())})
                        }}>
                            <p>
                                {featureCopy.sharpen.m1}
                            </p>
                        </div>
                        <div className={s.plus}>
                            <button onClick={() => {
                                sharpen({...featureCopy.sharpen, m1: featureCopy.sharpen.m1 + 0.5})
                            }}>+
                            </button>
                        </div>
                        <div className={tipStatus.m1 ? s.infoShow : s.infoHide}
                             onMouseEnter={() => setTipStatus({
                                 ...tipStatus,
                                 sigmaCase: false,
                                 m1Case: true,
                                 m2Case: false,
                                 x1Case: false,
                                 y2Case: false,
                                 y3Case: false
                             })} onMouseLeave={() => setTipStatus({
                            ...tipStatus,
                            sigmaCase: false,
                            m1Case: false,
                            m2Case: false,
                            x1Case: false,
                            y2Case: false,
                            y3Case: false
                        })}>
                            ?
                        </div>
                        <div className={tipStatus.m1Case && tipStatus.m1 ? s.infoCaseShow : s.infoCaseHide}>
                            the level of sharpening to apply to "flat" areas, between 0 and 1000000
                        </div>
                    </div>
                </div>
                <div className={s.inputBlock} onMouseEnter={() => setTipStatus({
                    ...tipStatus,
                    m2Case: false,
                    sigma: false,
                    m1: false,
                    m2: true,
                    x1: false,
                    y2: false,
                    y3: false
                })}
                     onMouseLeave={() => setTipStatus({
                         ...tipStatus,
                         m2Case: false,
                         sigma: false,
                         m1: false,
                         m2: false,
                         x1: false,
                         y2: false,
                         y3: false
                     })}>
                    <h3>
                        m2:
                    </h3>
                    <div className={s.input}>
                        <div className={s.minus}>
                            <button onClick={() => {
                                sharpen({...featureCopy.sharpen, m2: featureCopy.sharpen.m2 - 0.5})
                            }}>-
                            </button>
                        </div>
                        <div className={s.inputField} onClick={() => {
                            sharpen({...featureCopy.sharpen, m2: parseFloat(prompt())})
                        }}>
                            <p>
                                {featureCopy.sharpen.m2}
                            </p>
                        </div>
                        <div className={s.plus}>
                            <button onClick={() => {
                                sharpen({...featureCopy.sharpen, m2: featureCopy.sharpen.m2 + 0.5})
                            }}>+
                            </button>
                        </div>
                        <div className={tipStatus.m2 ? s.infoShow : s.infoHide}
                             onMouseEnter={() => setTipStatus({
                                 ...tipStatus,
                                 sigmaCase: false,
                                 m1Case: false,
                                 m2Case: true,
                                 x1Case: false,
                                 y2Case: false,
                                 y3Case: false
                             })} onMouseLeave={() => setTipStatus({
                            ...tipStatus,
                            sigmaCase: false,
                            m1Case: false,
                            m2Case: false,
                            x1Case: false,
                            y2Case: false,
                            y3Case: false
                        })}>
                            ?
                        </div>
                        <div className={tipStatus.m2Case && tipStatus.m2 ? s.infoCaseShow : s.infoCaseHide}>
                            the level of sharpening to apply to "jagged" areas, between 0 and 1000000
                        </div>
                    </div>
                </div>
                <div className={s.inputBlock} onMouseEnter={() => setTipStatus({
                    ...tipStatus,
                    x1Case: false,
                    sigma: false,
                    m1: false,
                    m2: false,
                    x1: true,
                    y2: false,
                    y3: false
                })}
                     onMouseLeave={() => setTipStatus({
                         ...tipStatus,
                         x1Case: false,
                         sigma: false,
                         m1: false,
                         m2: false,
                         x1: false,
                         y2: false,
                         y3: false
                     })}>
                    <h3>
                        x1:
                    </h3>
                    <div className={s.input}>
                        <div className={s.minus}>
                            <button onClick={() => {
                                sharpen({...featureCopy.sharpen, x1: featureCopy.sharpen.x1 - 0.5})
                            }}>-
                            </button>
                        </div>
                        <div className={s.inputField} onClick={() => {
                            sharpen({...featureCopy.sharpen, x1: parseFloat(prompt())})
                        }}>
                            <p>
                                {featureCopy.sharpen.x1}
                            </p>
                        </div>
                        <div className={s.plus}>
                            <button onClick={() => {
                                sharpen({...featureCopy.sharpen, x1: featureCopy.sharpen.x1 + 0.5})
                            }}>+
                            </button>
                        </div>
                        <div className={tipStatus.x1 ? s.infoShow : s.infoHide}
                             onMouseEnter={() => setTipStatus({
                                 ...tipStatus,
                                 sigmaCase: false,
                                 m1Case: false,
                                 m2Case: false,
                                 x1Case: true,
                                 y2Case: false,
                                 y3Case: false
                             })} onMouseLeave={() => setTipStatus({
                            ...tipStatus,
                            sigmaCase: false,
                            m1Case: false,
                            m2Case: false,
                            x1Case: false,
                            y2Case: false,
                            y3Case: false
                        })}>
                            ?
                        </div>
                        <div className={tipStatus.x1Case && tipStatus.x1 ? s.infoCaseShow : s.infoCaseHide}>
                            threshold between "flat" and "jagged", between 0 and 1000000
                        </div>
                    </div>
                </div>
                <div className={s.inputBlock} onMouseEnter={() => setTipStatus({
                    ...tipStatus,
                    y2Case: false,
                    sigma: false,
                    m1: false,
                    m2: false,
                    x1: false,
                    y2: true,
                    y3: false
                })}
                     onMouseLeave={() => setTipStatus({
                         ...tipStatus,
                         y2Case: false,
                         sigma: false,
                         m1: false,
                         m2: false,
                         x1: false,
                         y2: false,
                         y3: false
                     })}>
                    <h3>
                        y2:
                    </h3>
                    <div className={s.input}>
                        <div className={s.minus}>
                            <button onClick={() => {
                                sharpen({...featureCopy.sharpen, y2: featureCopy.sharpen.y2 - 0.5})
                            }}>-
                            </button>
                        </div>
                        <div className={s.inputField} onClick={() => {
                            sharpen({...featureCopy.sharpen, y2: parseFloat(prompt())})
                        }}>
                            <p>
                                {featureCopy.sharpen.y2}
                            </p>
                        </div>
                        <div className={s.plus}>
                            <button onClick={() => {
                                sharpen({...featureCopy.sharpen, y2: featureCopy.sharpen.y2 + 0.5})
                            }}>+
                            </button>
                        </div>
                        <div className={tipStatus.y2 ? s.infoShow : s.infoHide}
                             onMouseEnter={() => setTipStatus({
                                 ...tipStatus,
                                 sigmaCase: false,
                                 m1Case: false,
                                 m2Case: false,
                                 x1Case: false,
                                 y2Case: true,
                                 y3Case: false
                             })} onMouseLeave={() => setTipStatus({
                            ...tipStatus,
                            sigmaCase: false,
                            m1Case: false,
                            m2Case: false,
                            x1Case: false,
                            y2Case: false,
                            y3Case: false
                        })}>
                            ?
                        </div>
                        <div className={tipStatus.y2Case && tipStatus.y2 ? s.infoCaseShow : s.infoCaseHide}>
                            maximum amount of brightening, between 0 and 1000000
                        </div>
                    </div>
                </div>
                <div className={s.inputBlock} onMouseEnter={() => setTipStatus({
                    ...tipStatus,
                    y3Case: false,
                    sigma: false,
                    m1: false,
                    m2: false,
                    x1: false,
                    y2: false,
                    y3: true
                })}
                     onMouseLeave={() => setTipStatus({
                         ...tipStatus,
                         y3Case: false,
                         sigma: false,
                         m1: false,
                         m2: false,
                         x1: false,
                         y2: false,
                         y3: false
                     })}>
                    <h3>
                        y3:
                    </h3>
                    <div className={s.input}>
                        <div className={s.minus}>
                            <button onClick={() => {
                                sharpen({...featureCopy.sharpen, y3: featureCopy.sharpen.y3 - 0.5})
                            }}>-
                            </button>
                        </div>
                        <div className={s.inputField} onClick={() => {
                            sharpen({...featureCopy.sharpen, y3: parseFloat(prompt())})
                        }}>
                            <p>
                                {featureCopy.sharpen.y3}
                            </p>
                        </div>
                        <div className={s.plus}>
                            <button onClick={() => {
                                sharpen({...featureCopy.sharpen, y3: featureCopy.sharpen.y3 + 0.5})
                            }}>+
                            </button>
                        </div>
                        <div className={tipStatus.y3 ? s.infoShow : s.infoHide}
                             onMouseEnter={() => setTipStatus({
                                 ...tipStatus,
                                 sigmaCase: false,
                                 m1Case: false,
                                 m2Case: false,
                                 x1Case: false,
                                 y2Case: false,
                                 y3Case: true
                             })} onMouseLeave={() => setTipStatus({
                            ...tipStatus,
                            sigmaCase: false,
                            m1Case: false,
                            m2Case: false,
                            x1Case: false,
                            y2Case: false,
                            y3Case: false
                        })}>
                            ?
                        </div>
                        <div className={tipStatus.y3Case && tipStatus.y3 ? s.infoCaseShow : s.infoCaseHide}>
                            maximum amount of darkening, between 0 and 1000000
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sharpen