import {configureStore} from '@reduxjs/toolkit';

export const store=configureStore({
    reducer:{
        userDetails:(state=null,action)=>{
            switch(action.type){
                //This case will help in setting new value of userDetails like after login
                case 'SET_USER':
                    return action.payload;
                //This case will help in resetting userDetails like after logout
                case 'CLEAR_USER':
                    return null;
                //This case ensures we're not updating userDetails if some other state value gets changed
                default:
                    return state;
            }
        }
    }
})