import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../../apiConfig'
import MessageForm from '../MessageForm'
// import Layout from './shared/Layout.js'

class EditMessage extends Component {
  constructor () {
    super()
    this.state = {
      message: null,
      updated: null,
      deleted: null
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
    axios.patch(`${apiUrl}/messages/${this.props.match.params.id}`, {
      message: this.state.message
    })
      .then(res => this.setState({ updated: true }))
      .catch(console.error)
  }

  render () {
    const { message, updated } = this.state
    // console.log('message', message)
    let messageJsx = ''
    if (updated) {
      return <Redirect to={/messages/ + this.props.match.params.id}/>
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
        <h3>edit page</h3>
        {messageJsx}
      </Fragment>
    )
  }
}

export default EditMessage
