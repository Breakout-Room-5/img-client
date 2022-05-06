
import React, { useState, useEffect } from 'react'
// import { indexMemes } from '../../api/meme'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Redirect, withRouter } from 'react-router-dom'
// import './App.css'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'

function EditMeme ({ user, match, msgAlert }) {
  //   const [selected, setSelected] = useState({})
  const [upload, setUpload] = useState(null)
  const [name, setName] = useState('')
  const [updated, setUpdated] = useState(false)

  useEffect(() => {
    axios({
      url: `${apiUrl}/uploads/${match.params.id}`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
        setUpload(res.data.upload)
      })
  }, [])

  const onSubmit = (event) => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/uploads/${match.params.id}`,
      method: 'PATCH',
      data: {
        upload: {
          name: name
        }
      },
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    })
      .then(() => setUpdated(true))
      .then(() => {
        msgAlert({
          heading: 'Update Success',
          message: 'You got it!',
          variant: 'success'
        })
      })
      .catch((error) => {
        msgAlert({
          heading: 'Oops',
          message: 'Update error: ' + error.message,
          variant: 'danger'
        })
      })
  }
  const handleName = (event) => {
    setName(event.target.value)
  }
  if (!upload) {
    return <p>Loading...</p>
  }

  if (updated) {
    return (
      <Redirect
        to={{ pathname: '/my-memes', state: { msg: 'You successfully updated your Meme' } }}
      />
    )
  }

  return (
    <div>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId='name'>
          <Form.Label className='headers'>Name</Form.Label>
          <Form.Control
            required
            name='name'
            value={name}
            placeholder='The Meme Name'
            onChange={handleName}
          />
        </Form.Group>
        <Button variant='primary' type='submit'> Submit
        </Button>
      </Form>
    </div>
  )
}

export default withRouter(EditMeme)
