import React from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ImageUpload from './pages/ImageUpload';
import VoterScanning from './pages/VoterScanning';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './pages/ProtectedRoute';
import Account from './pages/Account';

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthContextProvider />,
    children: [{
      path: "/",
      element: <Home />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/signup",
      element: <Signup />
    },
    {
      path: "/imageUpload",
      element: <ImageUpload />
    },
    {
      path: "/voterScanning",
      element: <VoterScanning />
    },
    {
      path: "/account",
      element: <ProtectedRoute />,
      children: [{
        path: "/account",
        element: <Account />
      }]
    }
    ]
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
