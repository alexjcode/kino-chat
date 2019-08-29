import apiUrl from '../apiConfig'
import axios from 'axios'

export const createMessage = (input, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/messages',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      message: {
        text: input.message.text
      }
    }
  })
}

export const indexMessages = () => {
  return axios({
    url: apiUrl + '/messages'
  })
}

export const showMessage = id => {
  return axios({
    url: apiUrl + '/messages/' + id
  })
}

export const updateMessage = (input, user) => {
  return axios({
    url: apiUrl + '/messages/' + input.message._id,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      message: {
        text: input.message.text
      }
    }
  })
}

export const deleteMessage = (input, user) => {
  console.log('token', user.token)
  console.log('input', input)
  return axios({
    url: apiUrl + '/messages/' + input.id,
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}
