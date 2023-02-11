import React from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import ImageUpload from './pages/ImageUpload';
import VoterScanning from './pages/VoterScanning';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/imageUpload",
    element: <ImageUpload />
  },
  {
    path: "/voterScanning",
    element: <VoterScanning />
  } 
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
