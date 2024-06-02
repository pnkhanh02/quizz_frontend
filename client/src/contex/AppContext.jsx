
import React, { createContext, useContext, useReducer } from "react";
import AppReducer, {initialState} from "../reducers/AppReducer";



const AppContext = createContext();

export const StateProvider = ({children})=>{
    const [state,dispatch] = useReducer(AppReducer, initialState);

    return (
        <AppContext.Provider value = {{state,dispatch}}>
            {children}
        </AppContext.Provider>
    );
};

export const useStateValue = ()=> useContext(AppContext);