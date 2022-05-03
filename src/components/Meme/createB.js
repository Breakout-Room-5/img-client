import React, { useState } from 'react'
import APIurl from '../config'
import { Form, Button, Container } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'

const CreateMeme = ({ history }) => {
  const [newMeme, setNewMeme] = useState({
    title: '',
    caption: '',
    image: null
  })

  const handleChange = (event) => {
    event.preventDefault()
    setNewMeme({ ...newEntry, [event.target.name]: event.target.value })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    // formData.append('title', newEntry.title);
    // formData.append('caption', newEntry.caption);
    // formData.append('user', newEntry.user);
    // formData.append('image', newEntry.image);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',

        Authorization: `Token ${localStorage.getItem('token')}`
      }
    }
    axios.post(`${APIurl}img-api/memes/`, formData, config).then(() => {
      history.push('/home')
    })
  }

  const handleImageChange = (event) => {
    event.preventDefault()

    setNewMeme({ ...newMeme, [event.target.name]: event.target.files[0] })
  }
  return (
    <Container className='create-form'>
      <Form className='content landing' onSubmit={handleSubmit}>
        <Form.Group>
          <Form.File name='image' onChange={handleImageChange} />
          <Form.Label>Title</Form.Label>
          <Form.Control
            type='input'
            name='title'
            placeholder='Enter Title'
            value={newMeme.title}
            onChange={handleChange}
          />
          <Button type='submit' name='Upload'>Upload
          </Button>
        </Form.Group>
      </Form>
    </Container>
  )
}

export default CreateMeme
