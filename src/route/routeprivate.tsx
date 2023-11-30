import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react"
import { auth } from "../services/firebaseconnection";
import { Navigate } from "react-router-dom";


interface RoutePrivateProps{
    children:ReactNode
}
export function RoutePrivate({children}:RoutePrivateProps): any{
    
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);
    useEffect(()=>{
       const unsub = onAuthStateChanged(auth,(user)=>{
          if(user){
             setLoading(false);
             setSigned(true);
          }else{
              
            setLoading(false);
            setSigned(false);
            
          }
       })

       return () =>{
         unsub();
       }
       
    },[])

    if(loading){
      return <></>
    }

    if(!signed){
       return <Navigate to="/login"/>
    }

    return children;
}