
import React, { useState, useEffect } from 'react'
// import { indexMemes } from '../../api/meme'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import { Redirect, Link, withRouter } from 'react-router-dom'
// import './App.css'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'

function ShowMeme ({ user, match }) {
  //   const [selected, setSelected] = useState({})
  const [upload, setUpload] = useState(null)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    console.log(user)
    console.log(match)
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
        setUpload(res.data.upload)
        console.log(res.data.memes)
      })
    //   .then(() => {
    //     msgAlert({
    //       heading: 'Index success',
    //       message: 'Woot indexed',
    //       variant: 'success'
    //     })
    //   })
      .then(console.log(upload))
      .catch(console.error)
    //   => {
    // msgAlert({
    //   heading: 'Index fail',
    //   message: 'Index error: ' + error.message,
    //   variant: 'danger'
    // })
    //   })
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
      .catch(console.error)
  }

  // const { memes } = this.state
  //   if (memes === null) {
  //     return 'Loading...'
  //   }
  if (!upload) {
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
      <h2>{upload.name}</h2>
      <p>Created At{upload.createdAt}</p>
      <p>Update At{upload.updatedAt}</p>
      <p>Owner{upload.owner}</p>
      <img src={upload.url} />
      <button onClick={destroy}>Delete meme</button>
      <Link to='/my-memes'>Back to My Memes</Link>
      <Link to={'/my-memes/' + match.params.id + '/edit'}>
        <button>Edit Meme</button>
      </Link>
    </div>
  )
}

export default withRouter(ShowMeme)
