
import { useContext, useEffect, useState } from "react";
import { TopRestro } from "./TopRestro";
import { WhatIsInYourMind } from "./WhatIsInYourMind";
import {Restro} from "./Restro";
import { Cordinates } from "./Context/Contextapi";
export function Body() {
 
  const [restrodata,setrestrodata]=useState([]);

  const [inyourmind,setinyourmind]=useState([]);
  const [isTitle,setTitle]=useState({topTitle:"",inMindTitle:"",onlineTitle:""})
  const [isAvailable,setIsAavilable]=useState({});
  // const[inMindTitle,setTitle]=useState("");
  // const [topTitle,setTopTitle]=useState("");
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
   
    // setTitle(result?.data?.cards[0]?.card?.card?.header.title);
    // setTopTitle(result?.data?.cards[1]?.card?.card?.header.title);
    console.log(result?.data);
    setTitle(
      {
        topTitle:result?.data?.cards[1]?.card?.card?.header?.title,
        inMindTitle:result?.data?.cards[0]?.card?.card?.header?.title,
        onlineTitle:result?.data?.cards[2]?.card?.card?.title
      }
    )

    setIsAavilable(result?.data);
  console.log(isTitle);

  }
  

  useEffect(()=>{fetchdata()},[lat,lng])

//use for wh
if(isAvailable.communication){
  return(
    <div className="w-[400px] h-[500px] mt-14 flex flex-col mx-auto items-center ">
    <img className=" w-[300px] h-[300px]"src="/src/assets/noavailable.png"/>
    <h1 className="w-full font-bold text-center">Location Unserviceable</h1>
    <p className="w-[80%] text-center">We don’t have any services here till now. Try changing location.
    </p>
    
    </div>


  )
}

  return (
    <div className="w-full ">
      <div className="w-[76%] mx-auto  mt-3 overflow-hidden">
          <WhatIsInYourMind info={{inyourmind,isTitle}}/>
          <TopRestro  info={{restrodata,isTitle}}/>
          <Restro  information={{restrodata,isTitle}}/>
          </div>
        
    </div>
      

  );
}
