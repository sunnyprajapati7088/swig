import { useSelector } from "react-redux";
import { Cartcontext } from "./Context/Contextapi"
import { useContext,useEffect ,useState} from "react"
export function Cart(){
    const {cartData,setCartData}=useContext(Cartcontext)
  
    console.log(cartData);
    if(cartData.length===0){
        return(
            <div className="mx-auto flex flex-col gap-5">
          
            <i className="fi fi-rr-order-history"></i>
            <h1>Add Something</h1>

            </div>
        )
    }

    function deletedata(i){
        let newarr=[...cartData];
        newarr.splice(i,1);
        
       setCartData(newarr);
       localStorage.setItem("cartData",JSON.stringify([...newarr,cartData]))
    console.log(i);
      
    }
  
console.log(cartData);
     return (

        <div className="  max-w-full min-h-screen items-center justify-center pl-52 pr-52 pt-8 ">
            <div className=" w-[100%] h-[200px]  ">
            {
                cartData.map(({price,name,id,imageId,description,vegClassifier,rating},i)=>
                    {
                        
              return (
                (
                    <div key={i} className="flex w-[80%]  justify-between mx-auto">
                      
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
                     <p className="line-clamp-3">
                       {description}
                     </p>
 
                     {
                       <span
                   
                         className="font-bold"
                       >
                         
                       </span>
                     }
                   </div>
                 </div>
                        <div className="flex flex-col justify-end items-center w-[165px] h-[141px] mt-4">
                        <img
                          className=" w-[156px] h-[130px] mb-2 rounded-[20px] relative"
                          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${imageId}`}
                        ></img>
                        <div  onClick={()=>(deletedata(i))}className="w-[90px] h-[40px] bg-white font-bold pt-1 hover:bg-green-800 hover:text-white  rounded-xl absolute text-center items-center border-2 border-gray-400 text-green-700 shadow-lg" >
                          Remove
                        </div>
                      </div>    
                     
                     </div>  
                 ))}
              )
}
            </div>
        
        </div>
     )
}