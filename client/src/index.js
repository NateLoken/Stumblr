import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import Context from './Context'
import reportWebVitals from './reportWebVitals'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

ReactDOM.render(
  <React.StrictMode>
    <Context>
      <App />
    </Context>
  </React.StrictMode>,
  document.getElementById('root')
)
// Register allows app to work offline
serviceWorkerRegistration.register();
reportWebVitals()
