import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export function TopRestro({ data }) {
  const [value, setvalue] = useState(0);
  // const [data, setdata] = useState([]);
  // async function fetchdata() {
  //   const data = await fetch(
  //     "https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.32750&lng=78.03250&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
  //   );
  //   const result = await data.json();
  //   console.log(
  //     result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
  //       ?.restaurants
  //   );
  //   setdata(
  //     result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
  //       ?.restaurants
  //   );
  // }
  console.log(data);
 
  

  function handlenext() {
    value >= 500 ? "" : setvalue((prev) => prev + 30);
    console.log(value);
  }
  function handleprev() {
    value <= 0 ? "" : setvalue((prev) => prev - 30);
    console.log(value);
  }
  
  // useEffect(() => {
  //   fetchdata();
  // }, []);
  return (
    <div className="mt-8 ">
      <div className="flex w-full justify-between ">
        <h1>TopRestro</h1>
        <div className="flex items-center w-[60px] justify-around">
          <div onClick={handleprev} className="cursor-pointer">
            <i className="fi fi-ts-arrow-circle-left"></i>
          </div>
          <div onClick={handlenext}>
            <i className="fi fi-ts-arrow-circle-right"></i>
          </div>
        </div>
      </div>

      <div
        className="flex gap-4 w-full  rounded-sm duration-100 "
        style={{ translate: `-${value}%` }}
      >
    
        {
         data.map(({info}, i) => (
          <Link key={i} to={`/RestrorentMenu/${info.name}/${"-"}/${info.locality}/${"-"}/${info.id}`}
           className="hover:scale-90">
            <div className="min-w-[285px] h-[182px] mt-4 relative">
              <img
                className="w-full h-full aspect-video object-cover rounded-2xl relative"
                src={
                  "https://media-assets.swiggy.com/swiggy/image/upload/" +
                  info?.cloudinaryImageId
                }
              />
              <div className="w-full h-full bg-gradient-to-t from-black from-1%  to-transparent  to-40% absolute overflow-hidden rounded-2xl top-0"></div>
              <p className="w-full h-full absolute top-36 text-xl  ml-6 font-bold text-white">
                {info.aggregatedDiscountInfoV3?.header}{" "}
                {info.aggregatedDiscountInfoV3?.subHeader}
              </p>
            </div>

            <div className="flex flex-col">
              <h2 className="font-bold ">{info.name}</h2>
              <div className="flex items-center">
                {" "}
                <i className="fi fi-sr-circle-star bg-green pr-2"></i>{" "}
               <span className="pt-0">{info.avgRatingString  +"  •"}</span>

               <p className="pl-3 pt-0 font-semibold">     {info.sla.slaString}</p>
              
               
              </div>
              <p className="text-base ">{info.cuisines.join(",")}</p>
             <p>{info.areaName}
             </p>
            </div>


          </Link>
        ))}
      </div>
      <hr className="border mt-8" />

      
    </div>
  );
}
