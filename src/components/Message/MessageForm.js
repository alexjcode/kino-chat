import React from 'react'
// import { Route, Link } from 'react-router-dom'
// import Messages from './Messages.js'
// import Message from './Message.js'

const MessageForm = ({ messageInfo, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <label>Type A Message</label>
    <input
      placeholder="..."
      name="text"
      value={messageInfo.text}
      onChange={handleChange}
    />
    <button type="submit">Submit</button>
  </form>
)

export default MessageForm

// $(function () {
//   $('form').submit(function(e){
//   e.preventDefault() // prevents page reloading
//   socket.emit('chat message', $('#m').val())
//   $('#m').val('')
//   return false
//   })
// })
