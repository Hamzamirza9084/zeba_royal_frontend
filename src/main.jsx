import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import axios from 'axios' // Import axios
import './index.css'
import App from './App.jsx'

// Set the base URL for all axios requests
axios.defaults.baseURL = 'http://localhost:5000';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)