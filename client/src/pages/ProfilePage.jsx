import { useContext } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNav from "../AccountNav";
import { useState } from "react";
export default function ProfilePage(){
    const [redirect, setRedirect] = useState(null);
    const {ready, user, setUser} = useContext(UserContext);

    let {subpage} = useParams();
    if (subpage === undefined){
        subpage = 'perfil'
    }

    async function logout(){
       await axios.post('/logout');
       setRedirect('/');
       setUser(null);
    }

    if(!ready){
        return 'Loading...';
    }

    if(ready && !user && !redirect) {
        return <Navigate to={'/login'}/>
    }

    if(redirect){
        return <Navigate to={redirect}/>
    }

    return(
        <div>
            <AccountNav/>
            {subpage === 'perfil' && (
                <div className="text-center max-w-lg mx-auto">
                    Inicio sesion: {user.name} ({user.email}) 
                    <br/>
                    <button onClick={logout} className="primary max-w-sm mt-2">Salir</button>
                </div>
            )}
            {subpage === 'lugares' && (
                <div>
                    <PlacesPage/>
                </div>
            )}
        </div>
    );
}