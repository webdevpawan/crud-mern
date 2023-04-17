import { createContext, useState } from "react";
export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const token = localStorage.getItem("token")
    const [user, setUser] = useState(token ? token : null);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {props.children}
        </AuthContext.Provider>
    );
};
