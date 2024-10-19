import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider,} from  "react-router-dom";
import GalleryPage from './gallery/pages/gallery-page';
import './index.css'
import Landing from './landing/pages/landing-page.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing/>,
  }, 
  {
    path: "/gallery",
    element: <GalleryPage />,
  },

]);



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
