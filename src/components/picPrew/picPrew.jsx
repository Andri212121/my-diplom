import s from "./picPrew.module.css"

let PicPrew = () => {


    let photoLoad = async (e) => {
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        console.log(formData)
        await fetch('http://localhost:3001/imagePost', {
            method: 'PUT',
            body: formData
        })
    }

    return (
        <div className={s.container}>
            <input type="file" accept="image/*" src="" alt="" onChange={e => {photoLoad(e)}}/>
        </div>
    )
}

export default PicPrew