import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'
import io from 'socket.io-client'
const socket = io(apiUrl)
// import DeleteMessage from '../../api/message'

class Messages extends Component {
  constructor (props) {
    super(props)
    this.state = {
      messages: []
    }
  }

  // componentDidMount () {
  //   axios(`${apiUrl}/messages`)
  //     .then(res => {
  //       this.setState({ messages: res.data.messages })
  //     })
  //     .catch(console.error)
  // }

  async componentDidMount () {
    try {
      const res = await axios(`${apiUrl}/messages`)
      this.setState({ messages: res.data.messages })
    } catch (err) {
      console.error(err)
    }
  }

  // {
  //   "_id": "5d643b55b2e4427fabd527b8",
  //   "updatedAt": "2019-08-26T20:04:37.404Z",
  //   "createdAt": "2019-08-26T20:04:37.404Z",
  //   "text": "general kenobi",
  //   "owner": "5d64368811b5ca7d64b2560d",
  //   "__v": 0
  // }

  // delete = event => {
  //   const id = event.target.getAttribute('messageid')
  //   console.log('event', id)
  //   axios.delete(`${apiUrl}/messages/${id}`)
  //     .then(console.log)
  //     .catch(console.error)
  // }

  // <button onClick={deleteMessage} messageid={message._id}>Delete</button>

  render () {
    socket.on('new message', (msg) => {
      if (this.state.messages[this.state.messages.length - 1] !== msg) {
        this.state.messages.push(msg)
        document.getElementById('message-list').append(<li key={msg._id}>
          <Link to={'/messages/' + msg._id}>{msg.text}</Link></li>)
      }
    })
    socket.on('new message sent', (msg) => {
      if (this.state.messages[this.state.messages.length - 1] !== msg) {
        this.state.messages.push(msg) // delayed
        // check aginst ID here
        // const index = parseInt(event.target.getAttribute('data-cell-index'))
        document.getElementById('message-list').append(<li key={msg._id}>
          <Link to={'/messages/' + msg._id}>{msg.text}</Link></li>)
      }
    })
    const messagesJsx = this.state.messages.map(message => (
      <li key={message._id}>
        <Link to={'/messages/' + message._id}>{message.text}</Link>
      </li>
    ))
    return (
      <div id="message-list">
        {this.state.messages ? console.log('msg-arr', this.state.messages) : null}
        {messagesJsx ? console.log('messagesJsx', messagesJsx) : null}
        {this.state.messages.length > 0 ? messagesJsx : 'Waiting for Messages'}
      </div>
    )
  }
}

// <DeleteMessage alert={this.alert} user={this.props.user} />

export default Messages
