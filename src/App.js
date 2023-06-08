import './App.css';
import SideBar from "./components/sidebar/sideBar";
import Header from "./components/header/header";
import PicPrew from "./components/picPrew/picPrew";
import {useState} from "react";
import loading from "./img/loading.svg"
import {useDispatch, useSelector} from "react-redux";

function App() {

    const [history, setHistory] = useState([])

    const dispatch = useDispatch()
    let load = useSelector(state => state.loading)

  return (
      <>
          <div className="App">
              <div className="div1">
                  <SideBar history={history} setHistory={setHistory}/>
              </div>
              <div className="div2">
                  <Header/>
              </div>
              <div className="div3">
                  <PicPrew/>
              </div>
          </div>
          <div className={load ? "loadingShow" : "loadingHide"}><img src={loading} alt=""/></div>
      </>

  );
}

export default App;
