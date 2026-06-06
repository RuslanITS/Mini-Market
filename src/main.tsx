import { createRoot } from 'react-dom/client'
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from 'react-router'
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
    <ToastContainer
      position='bottom-right'
    />
  </BrowserRouter>,
)
