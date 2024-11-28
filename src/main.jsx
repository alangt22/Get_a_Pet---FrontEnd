import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom"

// pages
import Home from './components/pages/Home.jsx'
import Login from './components/pages/auth/Login.jsx'
import Register from './components/pages/auth/Register.jsx'
import Profile from './components/pages/User/Profile'
import MyPets from './components/pages/pet/MyPets.jsx'
import AddPet from './components/pages/pet/AddPet.jsx'
import EditPet from './components/pages/pet/EditPet.jsx'
import PetDetail from './components/pages/pet/PetDetail.jsx'
import MyAdoptions from './components/pages/pet/MyAdoptions.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path:"/register",
        element: <Register/>
      },
      {
        path:"/login",
        element: <Login/>
      },
      {
        path:"/user/profile",
        element: <Profile/>
      },
      {
        path:"/pet/mypets",
        element: <MyPets/>
      },
      {
        path:"/pet/add",
        element: <AddPet/>
      },
      {
        path:"/pet/myadoptions",
        element: <MyAdoptions/>
      },
      {
        path:"/pet/:id",
        element: <PetDetail/>
      },
      {
        path:"/pet/edit/:id",
        element: <EditPet/>
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
