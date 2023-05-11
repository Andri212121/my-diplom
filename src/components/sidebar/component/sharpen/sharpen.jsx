import s from './sharpen.module.css'
import axios from "axios";
import {useState} from "react";

let Sharpen = (props) => {

    const [sharpen, setSharpen] = useState({
        sigma: 0,
        m1: 1,
        m2: 2,
        x1: 2,
        y2: 10,
        y3: 20
    })

    const [tipStatus, setTipStatus] = useState({
        sigma: false,
        m1: false,
        m2: false,
        x1: false,
        y2: false,
        y3: false
    })

    return (
        <div className={s.container}>
            <div className={s.title} style={props.status.sharpen === true ? {background: "#3a3939"} : null}
                 onClick={() => {
                     props.setStatus({...props.status, sharpen: !props.status.sharpen})
                 }}>
                <div className={s.text}>
                    <img src={require('../../../../img/icon/sharpen.png')} alt=""/>
                    <h2>
                        Sharpen
                    </h2>
                </div>
                <div className={s.arrow}>
                    <img className={props.status.sharpen === true ? s.arrowOpen : s.arrowClose}
                         src={require('../../../../img/icon/arrow-down-navigate.png')} alt=""/>

                </div>
            </div>
            <div className={props.status.sharpen === true ? s.contentShow : s.contentParent}>
                <div className={s.inputBlock} onMouseEnter={() => setTipStatus({
                    sigma: true,
                    m1: false,
                    m2: false,
                    x1: false,
                    y2: false,
                    y3: false
                })} onMouseLeave={() => setTipStatus({
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
                                setSharpen({...sharpen, sigma: sharpen.sigma - 0.5})
                            }}>-
                            </button>
                        </div>
                        <input type="number" value={sharpen.sigma} onChange={event => {
                            setSharpen({...sharpen, sigma: event.target.value})
                        }}/>
                        <div className={s.plus}>
                            <button onClick={() => {
                                setSharpen({...sharpen, sigma: sharpen.sigma + 0.5})
                            }}>+
                            </button>
                        </div>
                        <div className={tipStatus.sigma ? s.infoShow : s.infoHide}>
                            ?
                        </div>
                    </div>
                </div>
                <div className={s.inputBlock} onMouseEnter={() => setTipStatus({
                    sigma: false,
                    m1: true,
                    m2: false,
                    x1: false,
                    y2: false,
                    y3: false
                })}
                     onMouseLeave={() => setTipStatus({
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
                                setSharpen({...sharpen, m1: sharpen.m1 - 0.5})
                            }}>-
                            </button>
                        </div>
                        <input type="number" value={sharpen.m1} onChange={event => {
                            setSharpen({...sharpen, m1: event.target.value})
                        }}/>
                        <div className={s.plus}>
                            <button onClick={() => {
                                setSharpen({...sharpen, m1: sharpen.m1 + 0.5})
                            }}>+
                            </button>
                        </div>
                        <div className={tipStatus.m1 ? s.infoShow : s.infoHide}>
                            ?
                        </div>
                    </div>
                </div>
                <div className={s.inputBlock} onMouseEnter={() => setTipStatus({
                    sigma: false,
                    m1: false,
                    m2: true,
                    x1: false,
                    y2: false,
                    y3: false
                })}
                     onMouseLeave={() => setTipStatus({
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
                                setSharpen({...sharpen, m2: sharpen.m2 - 0.5})
                            }}>-
                            </button>
                        </div>
                        <input type="number" value={sharpen.m2} onChange={event => {
                            setSharpen({...sharpen, m2: event.target.value})
                        }}/>
                        <div className={s.plus}>
                            <button onClick={() => {
                                setSharpen({...sharpen, m2: sharpen.m2 + 0.5})
                            }}>+
                            </button>
                        </div>
                        <div className={tipStatus.m2 ? s.infoShow : s.infoHide}>
                            ?
                        </div>
                    </div>
                </div>
                <div className={s.inputBlock} onMouseEnter={() => setTipStatus({
                    sigma: false,
                    m1: false,
                    m2: false,
                    x1: true,
                    y2: false,
                    y3: false
                })}
                     onMouseLeave={() => setTipStatus({
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
                                setSharpen({...sharpen, x1: sharpen.x1 - 0.5})
                            }}>-
                            </button>
                        </div>
                        <input type="number" value={sharpen.x1} onChange={event => {
                            setSharpen({...sharpen, x1: event.target.value})
                        }}/>
                        <div className={s.plus}>
                            <button onClick={() => {
                                setSharpen({...sharpen, x1: sharpen.x1 + 0.5})
                            }}>+
                            </button>
                        </div>
                        <div className={tipStatus.x1 ? s.infoShow : s.infoHide}>
                            ?
                        </div>
                    </div>
                </div>
                <div className={s.inputBlock} onMouseEnter={() => setTipStatus({
                    sigma: false,
                    m1: false,
                    m2: false,
                    x1: false,
                    y2: true,
                    y3: false
                })}
                     onMouseLeave={() => setTipStatus({
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
                                setSharpen({...sharpen, y2: sharpen.y2 - 0.5})
                            }}>-
                            </button>
                        </div>
                        <input type="number" value={sharpen.y2} onChange={event => {
                            setSharpen({...sharpen, y2: event.target.value})
                        }}/>
                        <div className={s.plus}>
                            <button onClick={() => {
                                setSharpen({...sharpen, y2: sharpen.y2 + 0.5})
                            }}>+
                            </button>
                        </div>
                        <div className={tipStatus.y2 ? s.infoShow : s.infoHide}>
                            ?
                        </div>
                    </div>
                </div>
                <div className={s.inputBlock} onMouseEnter={() => setTipStatus({
                    sigma: false,
                    m1: false,
                    m2: false,
                    x1: false,
                    y2: false,
                    y3: true
                })}
                     onMouseLeave={() => setTipStatus({
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
                                setSharpen({...sharpen, y3: sharpen.y3 - 0.5})
                            }}>-
                            </button>
                        </div>
                        <input type="number" value={sharpen.y3} onChange={event => {
                            setSharpen({...sharpen, y3: event.target.value})
                        }}/>
                        <div className={s.plus}>
                            <button onClick={() => {
                                setSharpen({...sharpen, y3: sharpen.y3 + 0.5})
                            }}>+
                            </button>
                        </div>
                        <div className={tipStatus.y3 ? s.infoShow : s.infoHide}>
                            ?
                        </div>
                    </div>
                </div>
                <div className={s.confirm}>
                    <button onClick={() => {
                        axios.put(`http://localhost:3001/imageEdit?operation=sharpen`, sharpen).then(res => {
                            props.setImg({...props.img, crumbledImg: res.data})
                        })
                        props.setHistory([...props.history, {
                            operation: "sharpen",
                            affine: sharpen
                        }])
                    }}>Sharp
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Sharpen