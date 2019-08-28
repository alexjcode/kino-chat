import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig.js'
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
        {console.log('msg stuff', message)}
        <Link to={'/messages/' + message._id}>{message.text}</Link>
      </li>
    ))
    return (
      <Fragment>
        <h4>Messages Page</h4>
        {this.state.messages.length > 0 ? messagesJsx : 'Waiting for Messages'}
      </Fragment>
    )
  }
}

// <DeleteMessage alert={this.alert} user={this.props.user} />

export default Messages
