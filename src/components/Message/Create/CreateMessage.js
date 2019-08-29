import React, { Component, Fragment } from 'react'
// import { Redirect } from 'react-router-dom'
// import axios from 'axios'
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
        console.log('new id', res.data.message._id)
        return ''
      })
      .then(() => alert({
        heading: 'Message Created',
        message: 'you made a message',
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
      .catch(error => {
        console.error(error)
        this.setState({ message: null })
        alert({
          heading: 'oops',
          message: 'couldnt make a message',
          variant: 'danger'
        })
      })
  }

  // .then(() => {
  //   socket.emit('chat message', $('#m').val())
  //   $('#m').val('') // clear form
  //   return false // ???
  // })
  render () {
    return (
      <Fragment>
        <MessageForm
          messageInfo={this.state.message}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          action="Post"
        />
      </Fragment>
    )
  }
}

// /////////////////////////

// async componentDidMount () {
//   try {
//     const res = await axios.post(`${apiUrl}/messages`, 'data')
//     this.setState({ message: res.data.message })
//   } catch (err) {
//     console.error(err)
//   }
// }

export default withRouter(CreateMessage)
