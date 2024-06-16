import {createContext, useState} from "react";
import App from "../App";

export const CustomContext = createContext()

export const Context = (props) => {
    const [count, setCount] = useState(0)

    const value = {
        count,
        setCount
    }
    return <CustomContext.Provider value={value} children={<App />} />

}