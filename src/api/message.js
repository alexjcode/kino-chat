import apiUrl from '../apiConfig'
import axios from 'axios'

export const createMessage = input => {
  return axios({
    method: 'POST',
    url: apiUrl + '/messages',
    headers: {
      'Authorization': `Token token=${input.user.token}`
    },
    data: {
      message: {
        text: input.text
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

export const updateMessage = input => {
  return axios({
    url: apiUrl + '/messages' + input.id,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${input.user.token}`
    },
    data: {
      message: {
        text: input.text
      }
    }
  })
}

export const deleteMessage = input => {
  return axios({
    url: apiUrl + '/messages/' + input.id,
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${input.user.token}`
    }
  })
}
