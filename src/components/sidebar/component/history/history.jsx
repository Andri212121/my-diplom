import s from "./history.module.css"
import axios from "axios";

let History = (props) => {
    let paired = false
    console.log(props.history)
    let historyList = props.history.map((item, index) => {
        if (!paired) {

            if (item.operation === "rotate") {
                paired=!paired
                return (<div key={index} onClick={() => {console.log(index)}} className={s.listItemUnPaired}>Rotate angle:{item.angle}</div>)
            } else if (item.operation === "flip") {
                paired=!paired
                return (<div key={index} onClick={() => {console.log(index)}} className={s.listItemUnPaired}>Flip</div>)
            } else if (item.operation === "flop") {
                paired=!paired
                return (<div key={index} onClick={() => {console.log(index)}} className={s.listItemUnPaired}>Flop</div>)
            } else if (item.operation === "affine") {
                paired=!paired
                return (<div key={index} onClick={() => {console.log(index)}} className={s.listItemUnPaired}>Affine: [{item.affine[0][0]}], [{item.affine[0][1]}], [{item.affine[1][0]}], [{item.affine[1][1]}]</div>)
            }

        } else {
            if (item.operation === "rotate") {
                paired=!paired
                return (<div key={index} onClick={() => {console.log(index)}} className={s.listItemPaired}>Rotate angle:{item.angle}</div>)
            } else if (item.operation === "flip") {
                paired=!paired
                return (<div key={index} onClick={() => {console.log(index)}} className={s.listItemPaired}>Flip</div>)
            } else if (item.operation === "flop") {
                paired=!paired
                return (<div key={index} onClick={() => {console.log(index)}} className={s.listItemPaired}>Flop</div>)
            } else if (item.operation === "affine") {
                paired=!paired
                return (<div key={index} onClick={() => {console.log(index)}} className={s.listItemPaired}>Affine: [{item.affine[0][0]}], [{item.affine[0][1]}], [{item.affine[1][0]}], [{item.affine[1][1]}]</div>)
            }
        }
    })

    return (
        <div className={s.container}>
            <button onClick={() => {
                axios.put(`http://localhost:3001/imageEdit?operation=undo`, props.history).then(r => {})
            }}>Undo</button>
            <button disabled={true}>Redo</button>
            <div className={s.list}>
                {historyList}
            </div>
        </div>
    )
}

export default History