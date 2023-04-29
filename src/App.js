import './App.css';
import SideBar from "./components/sidebar/sideBar";
import Header from "./components/header/header";
import PicPrew from "./components/picPrew/picPrew";
import {useState} from "react";


function App() {

    const [img, setImg] = useState({
        prew: null,
        crumbledImg: null
    })

    const [history, setHistory] = useState([])

  return (
    <div className="App">
        <div className="div1">
            <SideBar img={img} setImg={setImg} history={history} setHistory={setHistory}/>
        </div>
        <div className="div2">
            <Header/>
        </div>
        <div className="div3">
            <PicPrew img={img} setImg={setImg}/>
        </div>
    </div>
  );
}

export default App;
