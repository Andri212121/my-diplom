import './App.css';
import SideBar from "./components/sidebar/sideBar";
import Header from "./components/header/header";
import PicPrew from "./components/picPrew/picPrew";


function App() {
  return (
    <div className="App">
        <div className="div1">
            <SideBar/>
        </div>
        <div className="div2">
            <Header/>
        </div>
        <div className="div3">
            <PicPrew/>
        </div>
    </div>
  );
}

export default App;
