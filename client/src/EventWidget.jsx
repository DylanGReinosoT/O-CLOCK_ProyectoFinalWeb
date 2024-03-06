import { useContext, useEffect, useState } from "react";
import {differenceInCalendarDays} from "date-fns";
import axios from "axios";
import { UserContext } from "./UserContext";
import { Navigate } from "react-router-dom";

export default function EventWidget({place}){
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] =useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    const {user} = useContext(UserContext);

    useEffect(() =>{
        if(user){
            setName(user.name);
        }
    }, [user])

    let numberOfDays = 0;
    if(checkIn && checkOut){
        numberOfDays = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    async function bookThisPlace (){
        const response = await axios.post('/events', {checkIn, checkOut, numberOfDays, name, phone,
            place:place._id,
            price:numberOfDays * place.price,
        });
        const eventId = response.data._id;
        setRedirect(`/cuenta/eventos/${eventId}`);
    }
    if(redirect){
        return <Navigate to={redirect}/>
    }
    return(
        <div>
            <div className="bg-white shadow p-4 rounded-2xl">
                        <div className="text-2xl text-center">
                            Precio: ${place.price} / por noche
                        </div>
                        <div className="border rounded-2xl mt-4">
                            <div className="flex">
                            <div className=" py-3 px-4 ">
                            <label>Inicio:</label>
                            <input type="date" 
                            value={checkIn} 
                            onChange={ev => setCheckIn(ev.target.value)}/>
                            </div>
                            <div className=" py-3 px-4 border-l">
                                <label>Salida:</label>
                                <input type="date" 
                                value={checkOut} 
                                onChange={ev => setCheckOut(ev.target.value)}/>
                            </div>
                            </div>
                            <div className=" py-3 px-4 border-t">
                                <label>Numero de Capacidad:</label>
                                <input type="number" 
                                value={numberOfGuests} 
                                onChange={ev => setNumberOfGuests(ev.target.value)}/>
                            </div>
                            {numberOfDays > 0 && (
                               <div className=" py-3 px-4 border-t">
                               <label>Nombre Completo:</label>
                               <input type="text" 
                               value={name} 
                               onChange={ev => setName(ev.target.value)}/>
                               <label>Numero Telefonico:</label>
                               <input type="tel" 
                               value={phone} 
                               onChange={ev => setPhone(ev.target.value)}/>
                           </div>
                            )}
                            </div>                        
                        <button onClick={bookThisPlace} className="primary mt-4">
                            Reservar este lugar: 
                            {numberOfDays > 0 && (
                                <span> ${numberOfDays * place.price}</span>
                            )}
                            </button>
                    </div>
        </div>
    );
}