import React from 'react'
import ReactDOM from 'react-dom/client'
import Video from './components/video/Video'

import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <Video />
    </React.StrictMode>
)
