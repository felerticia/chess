import {createContext,useContext} from 'react';

const AppContext = createContext();

export function useAppContext() {
    return useContext(AppContext);
}

export default AppContext;
