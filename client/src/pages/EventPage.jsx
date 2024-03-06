import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import EventsDates from "../EventsDates";

export default function EventPage(){
    const {id} = useParams();
    const [event, setEvent] = useState(null);
    useEffect(() => {
        if(id){
            axios.get('/events').then(response => {
                const foundEvent = response.data.find(({_id}) => _id === id);
                if(foundEvent){
                    setEvent(foundEvent);
                }
            });
        }
    }, [id])

    if(!event){
        return '';
    }
    return(
        <div className="my-8">
             <h1 className="text-3xl">{event.place.title}</h1>
             <AddressLink className="my-2 block">{event.place.address}</AddressLink>
             <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
                <div>
                    <h2 className="text-2xl mb-4">Información del lugar reservado:</h2>
                    <EventsDates event={event}/>
                </div>
               <div className="bg-primary p-6 text-white rounded-2xl">
                <div>Precio Total:</div>
                <div className="text-3xl">${event.price}</div>
               </div>
             </div>
             <PlaceGallery place={event.place}/>
        </div>
    );
}