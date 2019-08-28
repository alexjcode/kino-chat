import React from 'react'
import ReactDOM from 'react-dom'
import './index.scss'

import App from './components/App/App'
import { HashRouter } from 'react-router-dom'
import io from 'socket.io-client'
import apiUrl from './apiConfig'

const appJsx = (
  <HashRouter>
    <App />
  </HashRouter>
)

const socket = io(apiUrl)
socket.on('new message', function (msg) {
  // this.state.messages.append($('<li>').text(msg))
})

// const socket = io(apiUrl)
// socket.on('connect', onConnect)
// function onConnect () {
//   console.log()
//   // console.log('fe-connect ' + socket.id)
// }

ReactDOM.render(appJsx, document.getElementById('root'))
