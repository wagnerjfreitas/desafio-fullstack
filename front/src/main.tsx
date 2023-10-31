import ReactDOM from 'react-dom/client'
import { App } from './App.tsx'
import { StrictMode } from 'react'

import './styles/global.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
