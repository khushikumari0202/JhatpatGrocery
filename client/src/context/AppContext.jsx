import { createContext, useContext, useState} from "react";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

export const AppContextProvider = ({children}) =>{
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [isSeller, setIsSeller] = useState(false)
    const [showUserLogin, setshowUserLogin] = useState(false)

    const value = {navigate, user, setUser, setIsSeller, isSeller, 
        showUserLogin, setshowUserLogin
    }
    return <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>
}

export const useAppContext = ()=>{
    return useContext(AppContext)
}