import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

import App from './components/App/App'
import { HashRouter } from 'react-router-dom'
import io from 'socket.io-client'

const appJsx = (
  <HashRouter>
    <App />
  </HashRouter>
)

const socket = io('http://localhost:4741')
socket.on('connect', onConnect)
function onConnect () {
  console.log('fe-connect ' + socket.id)
}

ReactDOM.render(appJsx, document.getElementById('root'))
