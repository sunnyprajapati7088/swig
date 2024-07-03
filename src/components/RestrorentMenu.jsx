import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Cartcontext } from "./Context/Contextapi";

function RestrorentMenu() {
  const [menu, setmenu] = useState([]);
  const [ResInfo, setResInfo] = useState([]);
  const [offer, setoffer] = useState([]);
  const [togle, settogle] = useState(0);
  const [top, setTop] = useState([]);
 

  const { id } = useParams();

  async function fetchMenu() {
    const data = await fetch(
      `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=30.32750&lng=78.03250&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`
    );
    const result = await data.json();
    console.log(
      result?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
    );
    setoffer(
      result?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
    );

    let actualdata =
      result?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards;
    console.log(
      actualdata.filter((data) => data?.card?.card?.title == "Top Picks")
    );
    const toppicks = actualdata.filter(
      (data) => data?.card?.card?.title == "Top Picks"
    );
    let Realdata = actualdata.filter((data) => data?.card?.card?.itemCards);
    console.log(result?.data);
    setTop(toppicks[0]?.card?.card?.carousel);
    setResInfo(result?.data?.cards[2]?.card?.card?.info);
    setmenu(Realdata);
  }
  console.log(id);
  useEffect(() => {
    fetchMenu();
  }, []);
  const { cuisines } = ResInfo;
  console.log(cuisines);
  console.log(menu.text);

  const [value, setvalue] = useState(0);

  function handlenext() {
    value >= 100 ? "" : setvalue((prev) => prev + 30);
    console.log(value);
  }
  function handleprev() {
    value <= 0 ? "" : setvalue((prev) => prev - 30);
    console.log(value);
  }

  return (
    <div className=" pt-8 w-[50%] mx-auto">
      <div className="flex">
        <Link to={"/"} className="text-xs  font-semibold">
          Home /
        </Link>
        <p className="text-xs font-semibold">{ResInfo.city} /</p>
        <p className="text-xs font-semibold">{ResInfo.name}</p>
      </div>

      <h1 className="mt-10 font-bold text-2xl pl-4">{ResInfo.name}</h1>

      <div className="h-[200px] mx-auto  w-[100%] rounded-[20px] bg-gradient-to-t from-slate-400  mt-5  ">
        <div className="w-[95%] mx-auto h-[90%]  rounded-[20px] border-2 bg-white">
          <div className="flex items-center ml-3 mt-4">
            <i className="fi fi-sr-circle-star bg-green pr-2"></i>

            <div className="font-bold text-lg">
              {" "}
              {ResInfo.avgRatingString} ({ResInfo.totalRatingsString}) {"  • "}
              {ResInfo.costForTwoMessage}{" "}
            </div>
          </div>
          <p className="text-[#F15700] font-bold underline ml-3">
            {ResInfo.cuisines}
          </p>
          <div className="flex gap-2  mt-4 ">
            <div className="flex flex-col justify-center w-2 items-center  ml-3">
              <div>
                <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
              </div>
              <div className="w-[2px] h-6 bg-slate-300"></div>
              <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
            </div>
            <div className="flex flex-col">
              <p> Outlet {ResInfo.locality}</p>
              <p> {ResInfo?.sla?.slaString}</p>
            </div>
          </div>
          <hr className="mt-4 nb-4"></hr>
          <div className="flex gap-3 ml-3">
            <i className="fi fi-rs-biking-mountain"></i>
            <p>{ResInfo?.feeDetails?.message}</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between pt-5 pb-4">
          <h1 className="font-bold text-xl ">Deals For You</h1>
          <div className="flex items-center w-[60px] justify-around">
            <div onClick={handleprev} className="cursor-pointer">
              <i className="fi fi-ts-arrow-circle-left"></i>
            </div>
            <div onClick={handlenext}>
              <i className="fi fi-ts-arrow-circle-right"></i>
            </div>
          </div>
        </div>
       <div className="min-w-[50%]  overflow-x-hidden">
       <div
       className="flex   gap-4 duration-100"
       style={{ translate: `-${value}%` }}
     >
      
         {offer.map(({ info }, i) => (
           <Offercomponent data={info} key={i} />
         ))}
      
     </div>
       
       </div>

        <img className="mx-auto mt-8" src="/src/assets/menu.png"></img>

        <div className="bg-slate-100 w-full h-12 rounded-xl flex justify-between items-center ">
          <p className="ml-[255px] text-slate-400">Search for dishes </p>{" "}
          <i className="fi cursor-pointer mr-4 text-end text-sm fi-br-search"></i>
        </div>
{
     top &&   <Toppick Top={top} />
}
        <div>
          {menu.map(
            (
              {
                card: {
                  card: { itemCards, title },
                },
              },
              i
            ) => (
              <div key={i}>
                <Showmenu title={title} itemCards={itemCards} />
                <hr className="border-4 " />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
export default RestrorentMenu;

function Showmenu({ title, itemCards }) {
  const [isOpen, SetisOpen] = useState(true);
  function Toggle() {
    SetisOpen((prev) => !prev);
  }
  return (
    <div>
      <div className="flex justify-between w-full " onClick={Toggle}>
        <p className="font-bold pb-2 ">
          {title} ({itemCards.length})
        </p>
        <i className={"fi fi-rs-angle-" + (isOpen ? "up" : "down")}></i>
      </div>
      {isOpen && <Detailmenu itemCards={itemCards} />}
    </div>
  );
}


function Detailmenu({ itemCards }) {
  console.log(itemCards)
  const {cartData,setCartData}=useContext(Cartcontext)
  
  function handleadd(iid){
    cartData.find((data)=>data.id===iid.id)?`${alert("already added")}`: setCartData((pre)=>[...pre,iid])
    console.log(cartData);
    localStorage.setItem("cartData",JSON.stringify([...cartData,iid]))
   
  }
  function getdata() {
    let data = JSON.parse(localStorage.getItem("cartData")) || []
      ;
    setCartData(data);
  }
  
  useEffect(() => {
    getdata();
  },[])

  return (
    <div className="">
      {itemCards.map(
        (
          {
            card: {
              info: {id,
                description,
                name,
                price,
                imageId,
                itemAttribute: { vegClassifier },
                ratings: {
                  aggregatedRating: { rating },
                },
              },
            },
          },
          i
        ) => {
          const [more, setmore] = useState(false);
          return (
            <div key={i} className="    ">
              <div className="w-full flex justify-between mb-6">
                <div className="w-[60%]">
                  <div>
                    {" "}
                    {"NONVEG" == vegClassifier ? (
                      <img src="/src/assets/red.png"></img>
                    ) : (
                      <img src="/src/assets/green.png"></img>
                    )}
                  </div>
                  <h1 className="font-semibold text-[22px]">{name}</h1>
                  <h1 className="text-[20px]">₹ {price / 100}</h1>

                  {rating > 3 && (
                    <div>
                      <i className="fi fi-sr-circle-star bg-green pr-2"></i>{" "}
                      {rating}
                    </div>
                  )}
                  <div className="flex gap-3 cursor-pointer">
                    <p className={"line-clamp-" + (more ? "2" : "1")}>
                      {description}
                    </p>

                    {
                      <span
                        onClick={() => setmore((prev) => !prev)}
                        className="font-bold"
                      >
                        {more ? "less" : "more"}
                      </span>
                    }
                  </div>
                </div>
                <div className="flex flex-col justify-end items-center w-[165px] h-[141px] mt-4">
                  <img
                    className=" w-[156px] h-[130px] mb-2 rounded-[20px] relative"
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`}
                  ></img>
                  <div  onClick={()=>handleadd({price,name,id,imageId,description,vegClassifier,rating})} className="w-[90px] h-[40px] bg-white font-bold pt-1 hover:bg-green-800 hover:text-white  rounded-xl absolute text-center items-center border-2 border-gray-400 text-green-700 shadow-lg" >
                    ADD
                  </div>
                </div>
              </div>
              <hr />
            </div>
          );
        }
      )}
    </div>
  );
}

function Offercomponent({ data }) {
  return (
    <div className="">
      <div className="flex gap-3 border-2 min-w-[320px] h-[76px] p-3 rounded-[20px] relative">
        <img
          className="w-[50px] h-[50px]"
          src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_96,h_96/offers/generic"
        ></img>
        <div>
          <p className="font-bold text-xl">{data.header}</p>
          <p className="text-slate-400">{data.couponCode}</p>
        </div>
      </div>
    </div>
  );
}

function Toppick({ Top }) {
  console.log(Top);
  const len=Top.length;
  const [value,setvalue]=useState(0)
  function handlenext() {
    value >= len*70 ? "" : setvalue((prev) => prev + 30);
    console.log(value);
  }
  function handleprev() {
    value <= 0 ? "" : setvalue((prev) => prev - 30);
    console.log(value);
  }
  

  return (
    <div className="min-w-[50%] flex flex-col mb-6 ">
      <div className="flex justify-between pt-5 pb-4">
        <h1 className="font-bold text-xl ">Top Picks</h1>
        <div className="flex items-center w-[60px] justify-around">
          <div className="cursor-pointer" onClick={handleprev}>
            <i className="fi fi-ts-arrow-circle-left"></i>
          </div>
          <div>
            <i className="fi fi-ts-arrow-circle-right" onClick={handlenext}></i>
          </div>
        </div>
      </div >
 
        <div     className="min-w-[50%] flex gap-5   overflow-x-hidden rounded-xl ">
        
          {Top.map(
            (
              {
                dish: {
                  info: { imageId ,isVeg,name,price},
                },
              },
              i
            ) => (
             <div key={i}   style={{ translate: `-${value}%` }} className=" min-w-[288px] h-[295px] relative "  >
             
             <img
               
             className=" w-[288px] h-[295px] aspect-video SS-cover rounded-2xl "
             src={
               "https://media-assets.swiggy.com/swiggy/image/upload/" +
               imageId
             }
           />



           <div className=" w-[288px] h-[295px] bg-gradient-to-t from-black from-5%  to-transparent  to-40% absolute overflow-hidden rounded-2xl top-0"></div>
           <div className=" w-[288px] h-[295px] bg-gradient-to-r from-black from-1%  to-transparent  to-40% absolute overflow-hidden rounded-2xl top-0"></div>
           <div className=" w-[288px] h-[295px] bg-gradient-to-b from-black from-1%  to-transparent  to-40% absolute overflow-hidden rounded-2xl top-0"></div>
             
           {
            isVeg ==1 ?<img src="/src/assets/veg.png" className="absolute top-5 ml-[25px]  w-[25px] h-[25px]"></img> :<img src="/src/assets/nonveg.png" className="absolute top-5 ml-[25px] w-[25px] h-[25px]"></img> 

         }
          <h1 className="absolute top-12 text-white font-semibold ml-[25px] items-center text-xl">{name}</h1>
             
          <div className="flex justify-between  absolute top-[230px] w-[295px]">
            <h1 className="ml-[25px] text-white font-semibold text-xl">₹ {price/100}</h1>
            <div className="w-[90px] h-[40px] absolute bg-white font-bold right-4 pt-1 hover:bg-green-800 hover:text-white  rounded-xl absolute text-center items-center border-2 border-gray-400 text-green-700 shadow-lg">
            ADD
          </div>

          </div>
          
          </div>


             
            )
          )}
        </div>
        </div>
    
    
  );
}
