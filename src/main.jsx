import React from 'react'
import ReactDOM from 'react-dom/client'
import PropsExample from './PropsExample.jsx'
import { UseTest, TodoList, Avatar, Animals } from './Test.jsx'
import App from './state.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
