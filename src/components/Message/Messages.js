import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'
import io from 'socket.io-client'
import Button from 'react-bootstrap/Button'
const socket = io(apiUrl)

class Messages extends Component {
  constructor (props) {
    super(props)
    this.state = {
      messages: []
    }
  }

  msgCreated = msg => {
    if (this.state.messages[this.state.messages.length - 1] !== msg) {
      this.setState({ messages: [...this.state.messages, msg] })
    }
  }

  msgUpdated = msg => {
    const msgArr = this.state.messages
    let updatedMsg = msgArr.find(m => m._id === msg._id)
    if (updatedMsg) {
      updatedMsg = msg
      this.setState({ messages: msgArr })
    }
  }

  msgDeleted = msg => {
    const msgArr = this.state.messages
    let deletedMsg = msgArr.find(m => m._id === msg._id)
    if (deletedMsg) {
      deletedMsg = null
      this.setState({ messages: msgArr })
    }
  }

  async componentDidMount () {
    try {
      const res = await axios(`${apiUrl}/messages`)
      this.setState({ messages: res.data.messages })
      socket.on('new message sent', this.msgCreated)
      socket.on('message update sent', this.msgCreated)
      socket.on('message delete sent', this.msgDeleted)
    } catch (err) {
      console.error(err)
    }
  }

  componentWillUnmount () {
    socket.off('new message sent')
    socket.off('message update sent')
    socket.off('message delete sent')
  }

  // delete = event => {
  //   console.log('event', id)
  //   axios.delete(`${apiUrl}/messages/${id}`)
  //     .then(console.log)
  //     .catch(console.error)
  // }

  // <button onClick={deleteMessage} messageid={message._id}>Delete</button>

  render () {
    const messagesJsx = this.state.messages.map(message => (
      message && (<li key={message._id}>{this.props.user
        ? (<Fragment>
          <Link to={'/messages/' + message._id + '/edit'}>
            {message.text}
          </Link>
          <Button href={'/#/messages/' + message._id + '/delete'}>
            Delete
          </Button>
        </Fragment>)
        : message.text}</li>)
    ))
    return (
      <Fragment>
        {this.state.messages.length > 0 ? messagesJsx : 'Waiting for Messages'}
      </Fragment>
    )
  }
}

// <DeleteMessage alert={this.alert} user={this.props.user} />

export default Messages
