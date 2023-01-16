import React from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import ImageUpload from './pages/ImageUpload';

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
  }  
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
