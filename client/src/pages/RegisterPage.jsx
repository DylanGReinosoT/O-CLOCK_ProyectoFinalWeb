import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
export default function RegisterPage (){

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    
    async function registerUser(ev){
        ev.preventDefault();
        try{
         await axios.post('/registro', { 
            name,
            email,
            password,
        });
        alert('Registro completo. Ahora puedes iniciar sesión');
        }catch(e){
            alert('Resgistro fallido. Intente nuevamente');
        }
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">Registro</h1>
                <form className="max-w-md mx-auto " onSubmit={registerUser}>
                    <input type="text" placeholder="John Doe" 
                    value={name} 
                    onChange={ev => setName(ev.target.value)}/>
                    <input type="email" placeholder={"ejemplo@ejemplo.com"}
                    value={email} 
                    onChange={ev => setEmail(ev.target.value)}/>
                    <input type="password" placeholder={"contraseña"}  
                    value={password} 
                    onChange={ev => setPassword(ev.target.value)}/>
                    <button className="primary">Registar</button>
                    <div className="text-center py-2 text-gray-500">
                        ¿Ya tienes cuenta?
                        <Link className="underline text-black" to={'/login'}>Inicia sesión</Link>
                    </div>
                </form>
            </div>
            
        </div>
    );
}