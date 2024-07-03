import { createSlice } from "@reduxjs/toolkit";



const togleSlice=createSlice({
    name:"togleslce",
    initialState:{
        searchTogle:false
    },
    reducers:{
        toglesearch:(state,actions)=>{
            state.searchTogle=!state.searchTogle;

        }
    }
})

export const {toglesearch}=togleSlice.actions
export default togleSlice.reducer