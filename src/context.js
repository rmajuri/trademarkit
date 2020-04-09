import React, { useReducer } from 'react';
import reducer from './reducer';

export const Context = React.createContext();

export function Provider({ children }) {
    const [locationHistory, dispatch] = useReducer(reducer, {});
    return <Context.Provider value={{ locationHistory, dispatch}}>{children}</Context.Provider>
}