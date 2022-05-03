import apiUrl from '../apiConfig'
import axios from 'axios'

export const createMeme = (data, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/memes/',
    data,
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
