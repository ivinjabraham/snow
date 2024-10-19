import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider,} from  "react-router-dom";
import GalleryPage from './gallery/pages/gallery-page';
import WorkflowPage from './workflow/pages/workflow-page';
import Landing from './landing/pages/landing-page.tsx';
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing/>,
  }, 
  {
    path: "/gallery",
    element: <GalleryPage />,
  },
  {
    path: "/gallery/:slug",
    element: <WorkflowPage />,
  }

]);



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
