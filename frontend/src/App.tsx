import { useEffect } from 'react';
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import JoinPage from "./JoinPage";
import RoomPage from "./RoomPage";
import IntroductionPage from "./IntroductionPage";
import { connectWithSocketIOServer } from './utils/wss';

const router = createBrowserRouter([
  {
    path: "/join-room",
    element: <JoinPage />,
  },
  {
    path: "/room",
    element: <RoomPage />,
  },
  {
    path: "/",
    element: <IntroductionPage />,
  },

]);


const App = () => {
  useEffect(() => {
    connectWithSocketIOServer();
  }, []);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
