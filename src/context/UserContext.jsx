import { createContext, useState } from "react";
import useAuth from '../hooks/useAuth'

const Context = createContext()

function UserProvider({children}) {
    const { authenticated, register, logout, login } = useAuth()
    const [user, setUser] = useState({}) // Estado para armazenar as informações do usuário, incluindo a foto de perfil

    // Atualizando o login para incluir a foto de perfil
    const handleLogin = (userData) => {
        login(userData); // Chama a função de login
        setUser(userData); // Armazena as informações do usuário, incluindo foto
    }

    // Atualizando o registro para incluir a foto de perfil
    const handleRegister = async (userData) => {
        await register(userData);
        setUser(userData); // Armazena as informações do usuário
    }

    return (
        <Context.Provider value={{ authenticated, user, logout, handleLogin, handleRegister }}>
            {children}
        </Context.Provider>
    )
}

export { Context, UserProvider }
