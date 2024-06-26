import "./App.css";
import { Navbar } from "./components/Navbar";
import { Body } from "./components/Body";
import { Outlet, Route, Routes } from "react-router-dom";
import RestrorentMenu from "./components/RestrorentMenu";
import { Visibly,Cordinates } from "./components/Context/Contextapi";

import { useState } from "react";

function App() {
  const [visible, setVisible] = useState(false);
  const [cord,setCord]=useState({lat:30.32750,lng:78.03250})
  return (
    <Cordinates.Provider value={{cord,setCord}}>
      <Visibly.Provider value={{ visible, setVisible }}>
        <div>
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route path="/" element={<Body />}></Route>
              <Route
                path="/RestrorentMenu/:pizza/-/:locality/-/:id"
                element={<RestrorentMenu />}
              ></Route>
            </Route>
          </Routes>
        </div>
      </Visibly.Provider>
    </Cordinates.Provider>
  );
}

export default App;
