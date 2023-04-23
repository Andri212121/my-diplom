import s from "./operation.module.css"

let Operation = (props) => {

    let style = {}

    if (props.selected) {
      style = {backgroundColor: "#2b2c2f"}
    }

    return (
        <div className={s.operation} style={style}>
            <div className={s.img}>
                <img src={props.img} alt=""/>
            </div>
            <div className={s.title}>
                {props.title}
            </div>
        </div>
    )
}

export default Operation