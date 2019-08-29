import { Component } from 'react'
import { withRouter } from 'react-router-dom'
import apiUrl from '../../../apiConfig'
import { deleteMessage } from '../../../api/message'
import io from 'socket.io-client'
const socket = io(apiUrl)

class DeleteMessage extends Component {
  componentDidMount () {
    console.log('this.props', this.props)
    const { alert, user, match, history } = this.props
    console.log('user', user)
    deleteMessage(match.params.id, user)
      .then(() => alert({
        heading: 'Message Deleted',
        message: 'you deleted a message',
        variant: 'success'
      }))
      .then(() => socket.emit('deleted message', {
        _id: match.params.id,
        owner: user._id,
        log: `[${user.email}] // deleted a message // `
      }))
      .then(() => history.push('/'))
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

  render () { return '' }
}

export default withRouter(DeleteMessage)
