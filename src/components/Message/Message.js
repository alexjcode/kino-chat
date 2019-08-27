import React, { Component, Fragment } from 'react'
import { Redirect, Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

class Message extends Component {
  constructor (props) {
    super(props)
    this.state = {
      message: null,
      deleted: false
    }
  }

  // componentDidMount () {
  //   const { match } = this.props
  //   axios(`${apiUrl}/messages/${match.params.id}`)
  //     .then(res => this.setState({ message: res.data.message }))
  //     .catch(console.error)
  // }

  async componentDidMount () {
    try {
      const res = await axios(`${apiUrl}/messages/${this.props.match.params.id}`)
      this.setState({ message: res.data.message })
    } catch (err) {
      console.error(err)
    }
  }

  // delete = () => {
  //   axios.delete(`${apiUrl}/messages/${this.props.match.params.id}`)
  //     .then(res => this.setState({ deleted: true }))
  //     .catch(console.error)
  // }

  delete = async () => {
    try {
      await axios.delete(`${apiUrl}/messages/${this.props.match.params.id}`)
      this.setState({ deleted: true })
    } catch (err) {
      console.error(err)
    }
  }

  render () {
    const { message, deleted } = this.state
    let messageJsx = ''
    if (deleted) {
      return <Redirect to={
        {
          pathname: '/messages',
          state: {
            msg: 'Message deleted'
          }
        }
      }/>
    } else {
      message ? messageJsx = (
        <div>
          <p>{message.text}</p>
          <button onClick={this.delete} messageid={message.id}>Delete</button>
          <Link to={`/messages/${this.props.match.params.id}/edit`}>
            <button>Edit</button>
          </Link>
        </div>
      ) : messageJsx = 'Loading...'
    }
    return (
      <Fragment>
        {messageJsx}
      </Fragment>
    )
  }
}

export default Message
