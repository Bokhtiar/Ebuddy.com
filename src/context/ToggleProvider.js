import React, { createContext, useContext, useState } from "react"

export const ToggleContext = createContext()

export const ToggleProvider = ({ children }) => {
    const [data, setData] = useState({
        enableMdDashboard: 0,
    })

    return (
        <ToggleContext.Provider value={{data, setData}}>
            {children}
        </ToggleContext.Provider>
    )
}