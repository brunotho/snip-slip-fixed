console.log("Application.js loading...");

import "@hotwired/turbo-rails"
import "./controllers"
import React from 'react'
import { createRoot } from 'react-dom/client'
import MainComponent from "./components/MainComponent"
import "bootstrap/dist/css/bootstrap"
import * as bootstrap from "bootstrap"

document.addEventListener('turbo:load', () => {
  console.log("turbo:load fired");
  const mainContainer = document.getElementById('main')
  console.log("mainContainer:", mainContainer);
  if (mainContainer) {
    const gameSessionId = mainContainer.dataset.gameSessionId || null
    console.log("gameSessionId:", gameSessionId);
    const root = createRoot(mainContainer)
    root.render(<MainComponent gameSessionId={gameSessionId} />)
  }
})

window.bootstrap = bootstrap
