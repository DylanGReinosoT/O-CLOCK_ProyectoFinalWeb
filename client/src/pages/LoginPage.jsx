import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../UserContext";
export default function LoginPage (){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState('');
    const {setUser} = useContext(UserContext);

    async function handleLoginSubmit(ev){
        ev.preventDefault();
        try{
            const {datos} = await axios.post('/login',{email,password});
            setUser(datos);
            alert('Sesion inicia con exito');
            setRedirect(true);
        }catch (e){
            alert('Inicio fallido');
        }
    }

    if(redirect){
        return <Navigate to={'/'}/>
    }


    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Login</h1>
                <form className="max-w-md mx-auto" onSubmit={handleLoginSubmit}>
                    <input type="email" placeholder={"ejemplo@ejemplo.com"} 
                    value={email} 
                    onChange={ev => setEmail(ev.target.value)}/>
                    <input type="password" placeholder={"contraseña"}  
                    value={password} 
                    onChange={ev => setPassword(ev.target.value)}/>
                    <button className="primary">Login</button>
                    <div className="text-center py-2 text-gray-500">
                        ¿No tienes cuenta? 
                        <Link className="underline text-black" to={'/registro'}>Registrate ahora</Link>
                    </div>
                </form>
            </div>
            
        </div>
    );
}