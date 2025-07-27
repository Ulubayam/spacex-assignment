import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { CircularProgress, Box } from '@mui/material'
import './index.css'
import App from './App.tsx'

const LoadingFallback = () => (
  <Box 
    display="flex" 
    justifyContent="center" 
    alignItems="center" 
    minHeight="100vh"
    sx={{ backgroundColor: 'background.default' }}
  >
    <CircularProgress />
  </Box>
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<LoadingFallback />}>
      <App />
    </Suspense>
  </StrictMode>,
)
