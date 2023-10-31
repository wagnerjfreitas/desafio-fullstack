import { UserContext } from "@/contexts/UserContext";
import { useContext, useEffect } from "react";

export const Home = () => {
  const {user, logIn} = useContext(UserContext); 

  useEffect(() => {
    if(!user){
      logIn();
    }
  }, []);

  return (
    <div className="bg-white py-24 sm:py-32">
      
      <div className="mx-auto max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-1">
        <div className="text-4xl font-bold text-center">
          Desafio Full-Stack
        </div>
      </div>
    </div>
  )
}

