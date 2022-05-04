import React, { useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
// import './App.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// const data= new FormData()
// data.append('upload', selected)
// in the lesson Eron does this under App js which means this will render when the page opens, are we having an issue because it isn't rendering the default

function PostMeme ({ user }) {
  const [selected, setSelected] = useState({})
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    const data = new FormData()
    console.log(selected)
    data.append('upload', selected)
    data.append('name', name)
    console.log(data)
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
        console.log(res.data.upload)
        setFile(res.data.upload.url)
      })
    //   .then((res) => console.log(res.data.upload.url))
      .then(() => setLoading(false))
      .catch(console.error)
  }

  const handleChange = (event) => {
    setSelected(event.target.files[0])
  }

  const handleName = (event) => {
    setName(event.target.value)
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
            {/* <input id="fileUpload" label="Upload File Here" type='file' onChange={handleChange} /> */}
          </Form.Group>
          <Button variant='primary' type='submit'>Submit</Button>
        </Form>
      </div>
    </>
  )
}

export default PostMeme
