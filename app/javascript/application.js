console.log("HIIIIII 🤗")

import "@hotwired/turbo-rails"
import "./controllers"
import React from 'react'
import { createRoot } from 'react-dom/client'

import MainComponent from './components/MainComponent'

document.addEventListener('turbo:load', () => {
  const mainContainer = document.getElementById('main')
  if (mainContainer) {
    const gameSessionId = mainContainer.dataset.gameSessionId || null
    const root = createRoot(mainContainer)
    root.render(<MainComponent gameSessionId={gameSessionId} />)
  }
})
