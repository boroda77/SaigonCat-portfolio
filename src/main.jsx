import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
// console.log("ENV:", import.meta.env.VITE_APPWRITE_ENDPOINT, import.meta.env.VITE_APPWRITE_PROJECT_ID);
