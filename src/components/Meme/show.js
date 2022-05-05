
import React, { useState, useEffect } from 'react'

import axios from 'axios'
import apiUrl from '../../apiConfig'

import { Redirect, Link, withRouter } from 'react-router-dom'

function ShowMeme ({ user, match, msgAlert }) {
  const [meme, setMeme] = useState(null)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    axios({
      url: `${apiUrl}/uploads/${match.params.id}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'multipart/form-data'
      }
      // pass in, fire request, send me the arrays, filter this list for users =
      // filter => resource === user id
      // new array meet conditions
      // pass that array to map
    })
      .then((res) => {
        setMeme(res.data.upload)
      })
  }, [])
  const destroy = () => {
    axios({
      url: `${apiUrl}/uploads/${match.params.id}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => setDeleted(true))
      .then(() => {
        msgAlert({
          heading: 'Deleted',
          message: 'Meme Yeeted',
          variant: 'success'
        })
      })
      .catch(error => {
        msgAlert({
          heading: 'It\'s not going anywhere!',
          message: 'Delete error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  if (!meme) {
    return <p>Loading...</p>
  }

  if (deleted) {
    return (
      <Redirect
        to={{ pathname: '/my-memes', state: { msg: 'You successfully deleted your Meme' } }}
      />
    )
  }

  return (
    <div>
      <h1>{meme.name}</h1>
      <img className='displayImg' src={meme.url} />
      <p>Creator: {meme.author}</p>
      <p>Created: {meme.createdAt.substring(0, 10)}</p>
      <p>Updated: {meme.updatedAt.substring(0, 10)}</p>

      <button onClick={destroy}>Delete meme</button>
      <Link to={'/my-memes/' + match.params.id + '/edit'}>
        <button>Edit Meme</button>
      </Link>
    </div>
  )
}

export default withRouter(ShowMeme)
