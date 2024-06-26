import { Link } from "react-router-dom"

export function Restro({data}){ 

    console.log(data);
   

    return (
        <div >
            <div>
                     Restaurants with online food delivery in Dehradun
            </div>
            
      <div  className=" w-full grid grid-cols-4 gap-6">
      {data.map(({ info}, i) => (
        <Link key={i} to={`/RestrorentMenu/${info.name}/${"-"}/${info.locality}/${"-"}/${info.id}`} className="hover:scale-90  ">
          <div className="max-w-[278px] h-[182px] mt-4 relative">
            <img
              className="w-full h-full object-cover   rounded-2xl relative"
              src={
                "https://media-assets.swiggy.com/swiggy/image/upload/" +
                info?.cloudinaryImageId
              }
            />
            <div className="w-full h-full bg-gradient-to-t from-black from-1%  to-transparent  to-40% absolute overflow-hidden rounded-2xl top-0"></div>
            <p className="w-full h-full absolute top-36 text-[20px] ml-6 font-bold text-white">
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
            <p className="text-base line-clamp-1">{info.cuisines.join(",")}</p>
           <p>{info.areaName}
           </p>
          </div>

          
        </Link>
      ))}

        </div>
     </div>
    )
}