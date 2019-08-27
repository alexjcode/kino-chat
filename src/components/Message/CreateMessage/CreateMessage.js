import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../../apiConfig'
import MessageForm from '../MessageForm'

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
    axios.post(`${apiUrl}/messages`, {
      message: this.state.message
    })
      .then(res => this.setState({ createdMessageId: res.data.message.id }))
      .catch(console.error)
  }

  // .then(() => {
  //   socket.emit('chat message', $('#m').val())
  //   $('#m').val('') // clear form
  //   return false // ???
  // })
  render () {
    const { createdMessageId } = this.state
    if (createdMessageId) {
      return <Redirect to={/messages/ + createdMessageId}/>
    } else {
      return (
        <Fragment>
          <MessageForm
            messageInfo={this.state.message}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
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
}

export default CreateMessage
