import React, { Component, Fragment } from 'react'
// import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router-dom'
import MessageForm from '../MessageForm'
import { createMessage } from '../../../api/message'
import apiUrl from '../../../apiConfig'
import io from 'socket.io-client'
const socket = io(apiUrl)

class CreateMessage extends Component {
  constructor () {
    super()
    this.state = {
      message: {
        text: ''
      },
      createdMessageId: null
    }
  }

  handleChange = event => {
    // console.log('event-target', event.target.value)
    const newField = {
      [event.target.name]: event.target.value
    }
    const newMessage = Object.assign(this.state.message, newField)
    this.setState({ message: newMessage })
  }

  handleSubmit = event => {
    event.preventDefault()
    const { alert, user } = this.props

    createMessage(this.state, user)
      .then(res => {
        this.setState({
          createdMessageId: res.data.message._id,
          messageData: res.data.message
        })
        // console.log('new id', res.data.message._id)
        return ''
      })
      .then(() => alert({
        heading: 'Message Created',
        // message: 'you made a message',
        variant: 'success'
      }))
      .then(() => socket.emit('new message', {
        text: this.state.message.text,
        _id: this.state.createdMessageId,
        updatedAt: this.state.messageData.updatedAt,
        createdAt: this.state.messageData.createdAt,
        owner: this.state.messageData.owner,
        __v: this.state.messageData.__v,
        log: `[${user.email}] ${this.state.message.text}`
      }))
      // clear forms on submit
      .then(() => this.setState({ message: { text: '' } }))
      .catch(error => {
        console.error(error)
        this.setState({ message: null })
        alert({
          heading: 'Failed to send message',
          // message: '',
          variant: 'danger'
        })
      })
  }

  render () {
    return (
      <Fragment>
        <MessageForm
          messageInfo={this.state.message}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          action="Send"
        />
      </Fragment>
    )
  }
}

export default withRouter(CreateMessage)
