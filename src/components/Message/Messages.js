import React, { Component, Fragment } from 'react'
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

  msgCreated = (msg) => {
    if (this.state.messages[this.state.messages.length - 1] !== msg) {
      // console.log('msg', msg)
      // console.log('msg', msg.text)
      this.setState({ messages: [...this.state.messages, msg] })
    }
  }

  async componentDidMount () {
    try {
      const res = await axios(`${apiUrl}/messages`)
      this.setState({ messages: res.data.messages })
      socket.on('new message sent', this.msgCreated)
    } catch (err) {
      console.error(err)
    }
  }

  componentWillUnmount () {
    socket.off('new message sent')
  }

  // delete = event => {
  //   const id = event.target.getAttribute('messageid')
  //   console.log('event', id)
  //   axios.delete(`${apiUrl}/messages/${id}`)
  //     .then(console.log)
  //     .catch(console.error)
  // }

  // <button onClick={deleteMessage} messageid={message._id}>Delete</button>

  render () {
    const messagesJsx = this.state.messages.map(message => (
      <li key={message._id}>
        <Link to={'/messages/' + message._id + '/edit'}>{message.text}</Link>
      </li>
    ))

    // {this.state.messages && console.log('msg-arr', this.state.messages)}
    // {messagesJsx && console.log('messagesJsx', messagesJsx)}

    return (
      <Fragment>
        {this.state.messages.length > 0 ? messagesJsx : 'Waiting for Messages'}
      </Fragment>
    )
  }
}

// <DeleteMessage alert={this.alert} user={this.props.user} />

export default Messages
