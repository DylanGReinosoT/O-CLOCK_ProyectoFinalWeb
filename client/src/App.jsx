
import { Routes, Route } from 'react-router-dom'
import './App.css'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import Layout from './Layout';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';
import {UserContextProvider} from "./UserContext";
import ProfilePage from './pages/ProfilePage';
import PlacesPage from './pages/PlacesPage';
import PlacesFromPage from './pages/PlacesFromPage';
import PlacePage from './pages/PlacePage';
import EventsPage from './pages/EventsPage';
import EventPage from './pages/EventPage';
axios.defaults.baseURL ='http://localhost:4000';
axios.defaults.withCredentials = true;


function App() {



  return (
    <UserContextProvider>
    <Routes>
      <Route path='/' element={<Layout/>}>
      <Route index element={<IndexPage />} />
      <Route path='/login' element={<LoginPage/>}/> 
      <Route path='/registro' element={<RegisterPage/>}/> 
      <Route path="/cuenta" element={<ProfilePage/>}/>
      <Route path="/cuenta/lugares" element={<PlacesPage/>}/>
      <Route path="/cuenta/lugares/new" element={<PlacesFromPage/>}/>
      <Route path="/cuenta/lugares/:id" element={<PlacesFromPage/>}/>
      <Route path="/lugares/:id" element={<PlacePage/>}/>
      <Route path="/cuenta/eventos/" element={<EventsPage/>}/>
      <Route path="/cuenta/eventos/:id" element={<EventPage/>}/>
      
      </Route>

    </Routes>
      
    </UserContextProvider>
  )
}

export default App
