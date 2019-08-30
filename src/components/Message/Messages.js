import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'
import io from 'socket.io-client'
import { deleteMessage } from '../../api/message'
import Button from 'react-bootstrap/Button'
const socket = io(apiUrl)

class Messages extends Component {
  constructor (props) {
    super(props)
    this.state = {
      messages: []
    }
  }

  delete = event => {
    event.preventDefault()
    // console.log('this.props', this.props)
    const { alert, user } = this.props
    // console.log('user', user)
    const messageId = event.target.getAttribute('msg-id')
    deleteMessage(messageId, user)
      .then(() => alert({
        heading: 'Message Deleted',
        message: 'you deleted a message',
        variant: 'success'
      }))
      .then(() => socket.emit('deleted message', {
        _id: messageId,
        owner: user._id,
        log: `[${user.email}] // deleted a message // `
      }))
      .catch(error => {
        console.error(error)
        this.setState({ message: null })
        alert({
          heading: 'oops',
          message: 'couldnt delete',
          variant: 'danger'
        })
      })
  }

  msgCreated = msg => {
    if (this.state.messages[this.state.messages.length - 1] !== msg) {
      this.setState({ messages: [...this.state.messages, msg] })
    }
  }

  msgUpdated = msg => {
    const msgArr = this.state.messages
    const updatedMsg = msgArr.find(m => m._id === msg._id)
    if (updatedMsg) {
      const index = msgArr.findIndex(m => m._id === msg._id)
      if (index === msgArr.length - 1) {
        this.setState({
          messages: [ ...msgArr.slice(0, index), msg ]
        })
      } else {
        this.setState({
          messages: [ ...msgArr.slice(0, index), msg, ...msgArr.slice(index + 1) ]
        })
      }
    }
  }

  msgDeleted = msg => {
    const msgArr = this.state.messages
    const deletedMsg = msgArr.find(m => m._id === msg._id)
    if (deletedMsg) {
      const index = msgArr.findIndex(m => m._id === msg._id)
      if (index === msgArr.length - 1) {
        this.setState({
          messages: [ ...msgArr.slice(0, index) ]
        })
      } else {
        this.setState({
          messages: [ ...msgArr.slice(0, index), ...msgArr.slice(index + 1) ]
        })
      }
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

  render () {
    const messagesJsx = this.state.messages.map(message => (
      message && (<li key={message._id}>{(this.props.user &&
        this.props.user._id === message.owner)
        ? (<Fragment>
          <Link to={'/messages/' + message._id + '/edit'}>
            {message.text}
          </Link>
          <Button onClick={this.delete} msg-id={message._id} type="submit">
            X
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

export default Messages
