import React from 'react';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/home/home";
import ErrorPage from "./pages/error-page/error-page";

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage></HomePage>
    }, {
        path: '*',
        element: <ErrorPage/>
    }
])

const App: React.FC = () => {
  return (
    <div className="App">
      <React.StrictMode>
        <RouterProvider router={router}/>
      </React.StrictMode>
    </div>
  );
}

export default App;
