
import { api } from "@/lib/axios";
import { ReactNode, createContext, useEffect, useState } from "react";


export interface User {
    id: number;
    name: string;
    email: string;
    imageUrl?: string;
  }

  export interface UserContextType {
    user: User | undefined;
    logIn: () => Promise<void>;
    logOut: () => void;
  }

  interface UserContextProviderProps {
    children: ReactNode;
  }

export const UserContext = createContext({} as UserContextType);

export function UserContextProvider({children}: UserContextProviderProps){

    const [user, setUser] = useState<User | undefined>()     

    async function logIn() {
        const {data} = await api.get('/user')
        console.log('UserContext -> logIn:', data)        
        setUser({...data, imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'})
    }

    function logOut() {
      setUser(undefined);
    }   
    
    useEffect(() => {
      console.log('userContext -> user:', user)
    }, [user])

    return (
        <UserContext.Provider value={{user, logIn, logOut}}>
          {children}
        </UserContext.Provider>
    )
}