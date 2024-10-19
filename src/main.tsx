import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider,} from  "react-router-dom";
import GalleryPage from './gallery/pages/gallery-page';
import Landing from './landing/pages/landing-page.tsx';
import './index.css'
import Prompt from './prompt/pages/prompt.tsx';
import Flow from './workflow-v2/pages/workflow-v2.tsx';

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
    path:"/gallery/:slug",
    element: <Flow/>,
  },
  {
    path: "/prompt/:slug", 
    element: <Prompt/>
  },
]);



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
