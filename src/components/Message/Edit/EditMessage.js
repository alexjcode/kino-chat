import React, { Component, Fragment } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../../apiConfig'
import MessageForm from '../MessageForm'
import { updateMessage, showMessage } from '../../../api/message'
import io from 'socket.io-client'
const socket = io(apiUrl)

class EditMessage extends Component {
  constructor () {
    super()
    this.state = {
      message: null,
      updatedMessageId: null
    }
  }

  async componentDidMount () {
    try {
      const res = await axios(`${apiUrl}/messages/${this.props.match.params.id}`)
      this.setState({ message: res.data.message })
    } catch (err) {
      console.error(err)
    }
  }

  handleChange = event => {
    // console.log('event-target', event.target.value)
    const updatedField = {
      [event.target.name]: event.target.value
    }
    const editedMessage = Object.assign(this.state.message, updatedField)
    this.setState({ message: editedMessage })
  }

  handleSubmit = event => {
    event.preventDefault()
    // console.log('props', this.props)
    const { alert, user } = this.props
    updateMessage(this.state, user)
      .then(() => showMessage(this.props.match.params.id))
      .then(res => {
        // console.log('show res data', res)
        this.setState({
          updatedMessageId: res.data.message._id,
          messageData: res.data.message
        })
        console.log('edited id', res.data.message._id)
        return ''
      })
      .then(() => alert({
        heading: 'Message Updated',
        message: 'you updated a message',
        variant: 'success'
      }))
      .then(() => socket.emit('updated message', {
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
          message: 'couldnt update',
          variant: 'danger'
        })
      })
  }

  render () {
    const { message, updatedMessageId } = this.state
    // console.log('message', message)
    let messageJsx = ''
    if (updatedMessageId) {
      return <Redirect to="/"/>
    } else {
      message ? messageJsx = (
        <MessageForm
          messageInfo={message}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          action="Edit"
        />
      ) : messageJsx = 'Loading...'
    }
    return (
      <Fragment>
        <h3>Edit</h3>
        {messageJsx}
      </Fragment>
    )
  }
}

export default withRouter(EditMessage)
