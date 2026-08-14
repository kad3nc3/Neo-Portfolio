import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App'
import './styles.css'

const removeInjectedSidebar = () => {
  document.querySelectorAll('chatgpt-sidebar').forEach((node) => node.remove())
}

removeInjectedSidebar()
const sidebarObserver = new MutationObserver((records) => {
  for (const record of records) {
    for (const node of record.addedNodes) {
      if (node.nodeType !== Node.ELEMENT_NODE) continue
      const element = /** @type {Element} */ (node)
      if (element.matches('chatgpt-sidebar') || element.querySelector('chatgpt-sidebar')) {
        removeInjectedSidebar()
        sidebarObserver.disconnect()
        return
      }
    }
  }
})

if (document.documentElement) {
  sidebarObserver.observe(document.documentElement, { childList: true, subtree: true })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
