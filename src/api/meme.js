import apiUrl from '../apiConfig'
import axios from 'axios'

export const createMeme = (data, user) => {
  console.log(data)
  return axios.post(apiUrl + '/memes/', data,
    {
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'multipart/form-data; boundary=MyBoundary'
      }
    })
}
