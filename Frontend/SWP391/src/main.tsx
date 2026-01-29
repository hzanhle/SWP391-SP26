import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'leaflet/dist/leaflet.css'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from './components/ErrorBoundary'
import { PlatformProvider } from './mock/platformStore'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <PlatformProvider>
        <App />
      </PlatformProvider>
    </ErrorBoundary>
  </StrictMode>,
)
