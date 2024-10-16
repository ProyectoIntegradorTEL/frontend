import { StrictMode } from 'react'

import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from '@material-tailwind/react'
import App from './App.jsx'
import './index.css'
import { TrialContextProvider } from './context/TrialContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TrialContextProvider>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </TrialContextProvider>
  </StrictMode>,
)
