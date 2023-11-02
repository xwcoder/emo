import { createRoot } from 'react-dom/client'
import App from '@/renderer/App'

import './style.css'

const root = createRoot(document.getElementById('root')!)

root.render(<App />)
