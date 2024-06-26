import { useContext, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Cordinates, Visibly } from "./Context/Contextapi";

export function Navbar() {
  const { visible, setVisible } = useContext(Visibly);
  function visiblity() {
    setVisible((prev) => !prev);
  }
  const [search, setSearch] = useState([]);
  async function fetchPlace(val) {
    console.log(val)
    if(val=="")return
    const data = await fetch(
      `https://www.swiggy.com/dapi/misc/place-autocomplete?input=${val}`
    );
    const result = await data.json();
    console.log(result);
    setSearch(result?.data);
    console.log(search);
  }

  const {cord ,setCord}=useContext(Cordinates);
  console.log(cord);
  async function funLanAndLog(id){
    
    console.log(id);
    if(id=="")return
    const data=await fetch(`https://www.swiggy.com/dapi/misc/address-recommend?place_id=${id}`)
    const result=await data.json();
    
    console.log(result.data[0].geometry.location);
    setCord({
      lat:result.data[0].geometry.location.lat,
      lng:result.data[0].geometry.location.lng
    });
  }

  return (
    <div className="w-full relative ">
      {visible && (
        <div className="w-full">
          <div
            className="min-h-screen  bg-black/50 absolute z-30 w-full"
            onClick={visiblity}
          >
            l
          </div>
          <div
            className={
              "min-h-screen bg-white min-w-[30%] absolute z-40 duration-500 ease-in-out" +
              (visible ? "left-0" : "-left-[100%]")
            }
          >
            <div className="flex flex-col max-h-screen  w-[90%] mx-auto items-center gap-6 top-4">
              <i
                className="fi fi-rr-cross mx-auto mb-4 ml-[70px] mt-10"
                onClick={visiblity}
              ></i>
              <div className="w-[70%]  h-12 items-center border-black border-2">
                {" "}
                <input
                  className=" border-1 w-[100%] outline-none p-2"
                  placeholder="Search for area,street Name.."
                  onChange={(e)=>fetchPlace(e.target.value)}
                />
              </div>
              <div className="w-[70%] items-center">
                <ul >
                  {search.map(({
                    structured_formatting: { main_text, secondary_text },place_id
                  },i)=>(
                  <li key={i} onClick={()=>funLanAndLog(place_id)} >
                <div className="flex gap-2 w-[90%]" >  
                <i className="fi fi-rs-marker"></i>
                <h1 className="w-full">{main_text}</h1></div>
                  <p className="w-full line-clamp-1">{secondary_text}</p>
                  <hr className="border-1 border-dashed pt-6"/>
                  </li>
                  ))}
                </ul>
              </div>

          
            </div>
          </div>
        </div>
      )}

      <div className="w-full shadow-md  h-[75px]  top-0 justify-center   items-center">
        <div className="w-[85%] h-[65px] flex mx-auto justify-between">
          <div className=" flex items-center  ">
            <Link to={"/"}>
              <img
                className="h-[60px] hover:h-[63px] ease-in-out"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZE11jzCgpRgCt4XJsCyGy-x6pp5mgvqwNAqDci86I6Hp-NBoVyvRIqrT5oYs4ajVgUEQ&usqp=CAU://w7.pngwing.com/pngs/47/533/png-transparent-swiggy-office-business-online-food-ordering-delivery-bangalore-business-food-text-orange-thumbnail.png"
              ></img>
            </Link>
            <h1
              className="font-bold border-b-2 border-black ml-10 hover:text-[#FC8019] hover:border-[#FC8019]"
              onClick={visiblity}
            >
              Other
            </h1>
            <p>{search?.structured_formatting?.secondary_text} </p>
            <i className="fi fi-rs-angle-down mt-2 ml-5 text-[#FC8019] font-bold"></i>
          </div>

          <div className="flex justify-between items-center w-[60%]  ">
            <div className="flex items-center  hover:text-[#FC8019]">
              <i className="fi mr-2 fi-ts-corporate-alt"></i>
              <p className="font-bold">Swiggy Corporate</p>
            </div>
            <div className="flex items-center  hover:text-[#FC8019]">
              <i className="fi mr-2 text-sm fi-br-search"></i>
              <p className="font-bold">Search</p>
            </div>
            <div className="flex items-center  hover:text-[#FC8019]">
              <i className="fi mr-2 fi-rr-badge-percent"></i>
              <p className="font-bold">
                Offers <sup className=" text-[#FC8019]">New</sup>
              </p>
            </div>
            <div className="flex items-center hover:text-[#FC8019]">
              <i className="fi mr-2 fi-br-seal-question"></i>
              <p className="font-bold">Help</p>
            </div>
            <div className="flex items-center  hover:text-[#FC8019]">
              <i className="fi mr-2 fi-rs-driver-man"></i>
              <p className="font-bold">Sign in</p>
            </div>
            <div className="flex items-center  hover:text-[#FC8019]">
              <i className="fi mr-2 fi-ts-cart-arrow-down"></i>
              <p className="font-bold">Cart</p>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
