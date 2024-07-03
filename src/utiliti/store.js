import { configureStore, Tuple } from '@reduxjs/toolkit'
import togleSlice from './togleSlice'


export const store=configureStore({

reducer:{
    togleSlice:togleSlice,

}

})


