import React from 'react';
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import ImageUpload from './pages/admin/ImageUpload';
import VoterScanning from './pages/VoterScanning';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import TrainModel from './pages/admin/TrainModel';
import SetPasscode from './pages/admin/SetPasscode';
import VoterDetails from './pages/admin/DisplayVoterDetails';
import Voter from './api/voter';

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
      path: "/voterScanning",
      element: <VoterScanning />
    },
    {
      path: "/adminDashboard",
      element: <ProtectedRoute />,
      children: [{
        path: "/adminDashboard",
        element: <AdminDashboard />
      }]
    },
    {
      path: "/imageUpload",
      element: <ProtectedRoute />,
      children: [{
        path: "/imageUpload",
        element: <ImageUpload />
      }]
    },
    {
      path: "/trainModel",
      element: <ProtectedRoute />,
      children: [{
        path: "/trainModel",
        element: <TrainModel />
      }]
    },
    {
      path: "/setPasscode",
      element: <ProtectedRoute />,
      children: [{
        path: "/setPasscode",
        element: <SetPasscode />
      }]
    },
    {
      path: "/displayVoterDetails",
      element: <ProtectedRoute />,
      children: [{
        path: "/displayVoterDetails",
        element: <VoterDetails />
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
