import React, { useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router-dom'
function PostMeme ({ user, msgAlert }) {
  const [selected, setSelected] = useState({})
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [created, setCreated] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    const data = new FormData()
    data.append('upload', selected)
    data.append('name', name)
    axios({
      url: `${apiUrl}/uploads`,
      method: 'POST',
      data,
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
        setFile(res.data.upload.url)
      })
      .then(() => setCreated(true))
      .then(() =>
        msgAlert({
          heading: 'Upload Success',
          message: 'Nice meme!',
          variant: 'success'
        })
      )
      .then(() => setLoading(false))
      .catch((error) => {
        msgAlert({
          heading: 'Oops',
          message: 'Upload fail:' + error.message,
          variant: 'danger'
        })
      })
  }

  const handleChange = (event) => {
    setSelected(event.target.files[0])
  }

  const handleName = (event) => {
    setName(event.target.value)
  }

  if (created) {
    return (
      <Redirect
        to={{
          pathname: '/my-memes'
        }}
      />
    )
  }

  return (
    <>
      <div className='App'>
        {file
          ? (
            <>
              <img className='displayImg' alt='uploaded file' src={file} />
            </>
          )
          : (
            ''
          )}
        {loading
          ? (
            <img
              alt='loading gif'
              src='https://miro.medium.com/max/882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif'
            />
          )
          : (
            ''
          )}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              name='name'
              value={name}
              placeholder='The Meme Name'
              onChange={handleName}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Upload your image</Form.Label>
            <Form.Control id="fileUpload" type="file" label="Upload File Here" onChange={handleChange}/>
          </Form.Group>
          <Button variant='primary' type='submit'>Submit</Button>
        </Form>
      </div>
    </>
  )
}

export default PostMeme
