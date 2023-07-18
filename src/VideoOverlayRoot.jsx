import React from 'react'
import ReactDOM from 'react-dom/client'
import { TwitchAuthProvider } from "./TwitchAuth.jsx";
import VideoOverlayApp from './VideoOverlayApp.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <TwitchAuthProvider>
    <VideoOverlayApp />
  </TwitchAuthProvider>
  // </React.StrictMode>,
)
