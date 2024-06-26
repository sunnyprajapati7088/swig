import { useEffect,useState } from "react";

export function WhatIsInYourMind({data}){
    // const [data, setdata] = useState([]);
    const [value, setvalue] = useState(0);
    // async function fetchdata() {
    //   const data = await fetch(
    //     "https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.32750&lng=78.03250&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    //   );
    //   const result = await data.json();
    //   console.log(result?.data?.cards[0]?.card?.card?.imageGridCards?.info);
    //   setdata(result?.data?.cards[0]?.card?.card?.imageGridCards?.info);
    // }
  
    // console.log(data);
    // useEffect(() => {
    //   fetchdata();
    // }, []);
  
    function handlenext() {
      value >= 144 ? "" : setvalue((prev) => prev + 30);
        
    }
  
    function handleprev() {
      value <= 0 ? "" : setvalue((prev) => prev - 30);
      console.log(value);
    }
    return (

      <div className="mt-4 ">
      
      <div className="flex w-full justify-between">
      <h1 className=" font-bold">What is in your Mind?</h1>
      <div className="flex items-center w-[50px] justify-around">
        <div onClick={handleprev} className="cursor-pointer">
          <i className="fi fi-ts-arrow-circle-left"></i>
        </div>
        <div onClick={handlenext}>
          <i className="fi fi-ts-arrow-circle-right"></i>
        </div>
      </div>
    </div>
    <div className="flex duration-100" style={{ translate: `-${value}%` }}>
      {data.map((item, i) => (
        <img 
          className="w-32"
          key={i}
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_250/${item.imageId}`}
        ></img>
      ))}
    
    </div>
    <hr className="border mt-8"/>
       </div>
    )
}