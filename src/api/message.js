import apiUrl from '../apiConfig'
import axios from 'axios'

export const createMessage = (input, user) => {
  console.log('token', user.token)
  console.log('input', input)
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

export const indexMessages = input => {
  return axios({
    url: apiUrl + '/messages',
    headers: {
      'Authorization': `Token token=${input.user.token}`
    }
  })
}

export const showMessage = input => {
  return axios({
    url: apiUrl + '/messages' + input.id,
    headers: {
      'Authorization': `Token token=${input.user.token}`
    }
  })
}

export const updateMessage = (input, user) => {
  return axios({
    url: apiUrl + '/messages' + input.id,
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
