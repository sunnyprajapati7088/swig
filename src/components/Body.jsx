
import { useContext, useEffect, useState } from "react";
import { TopRestro } from "./TopRestro";
import { WhatIsInYourMind } from "./WhatIsInYourMind";
import {Restro} from "./Restro";
import { Cordinates } from "./Context/Contextapi";
export function Body() {
 
  const [restrodata,setrestrodata]=useState([]);

  const [inyourmind,setinyourmind]=useState([]);
  const {cord}=useContext(Cordinates);

  console.log(cord)
  const {lat,lng}=cord;
  console.log(lat,lng);
  
  async function fetchdata() {
    const data = await fetch(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );
    const result = await data.json();
    
    console.log(
      result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
 
  setrestrodata(
      result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    )
    setinyourmind(result?.data?.cards[0]?.card?.card?.imageGridCards?.info)
    console.log(result?.data?.cards[0]?.card?.card?.imageGridCards?.info);

  }
  

  useEffect(()=>{fetchdata()},[])

//use for wh


  return (
    <div className="w-full ">
      <div className="w-[76%] mx-auto  mt-3 overflow-hidden">
          <WhatIsInYourMind data={inyourmind}/>
          <TopRestro  data={restrodata}/>
          <Restro  data={restrodata}/>
          </div>
        
    </div>
      

  );
}
