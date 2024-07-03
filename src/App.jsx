import "./App.css";
import { Navbar } from "./components/Navbar";
import { Body } from "./components/Body";
import { Outlet, Route, Routes } from "react-router-dom";
import RestrorentMenu from "./components/RestrorentMenu";
import { Visibly,Cordinates, Cartcontext } from "./components/Context/Contextapi";

import { useState } from "react";
import { Cart } from "./components/Cart";

function App() {

  const [cord,setCord]=useState({lat:30.32750,lng:78.03250})
  const [cartData,setCartData]=useState([]);
  return (
    <Cartcontext.Provider value={{cartData,setCartData}}>
    <Cordinates.Provider value={{cord,setCord}}>
    
        <div className="">
          <Routes>
            <Route path="/" element={<Navbar />}>
              <Route path="/" element={<Body />}></Route>
                <Route
                path="/RestrorentMenu/:pizza/-/:locality/-/:id"
                element={<RestrorentMenu />}></Route>
                <Route path="/Cart" element={<Cart/>}> </Route>
             </Route>
            
          </Routes>
        </div>
     
    </Cordinates.Provider>
    
    </Cartcontext.Provider>
  );
}

export default App;
