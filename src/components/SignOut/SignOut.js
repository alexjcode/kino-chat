import { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signOut } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import apiUrl from '../../apiConfig'
import io from 'socket.io-client'
const socket = io(apiUrl)

class SignOut extends Component {
  componentDidMount () {
    const { alert, history, clearUser, user } = this.props

    signOut(user)
      .finally(() => alert({
        heading: 'Signed Out Successfully',
        message: messages.signOutSuccess,
        variant: 'success'
      }))
      .finally(() => socket.emit('sign out', `[${user.email}] signed out`))
      .finally(() => history.push('/'))
      .finally(() => clearUser())
  }

  render () {
    return ''
  }
}

export default withRouter(SignOut)
