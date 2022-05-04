import React, { useState } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
// import './App.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

// const data= new FormData()
// data.append('upload', selected)
// in the lesson Eron does this under App js which means this will render when the page opens, are we having an issue because it isn't rendering the default

function PostMeme () {
  const [selected, setSelected] = useState({})
  const [file, setFile] = useState({})
  const [loading, setLoading] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setLoading(true)
    const data = new FormData()
    console.log(selected)
    data.append('upload', selected)
    console.log(data)
    axios({
      url: `${apiUrl}/uploads`,
      method: 'POST',
      data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => setFile(res.data.upload.url))
    //   .then((res) => console.log(res.data.upload.url))
      .then(() => setLoading(false))
      .catch(console.error)
  }

  const handleChange = (event) => {
    setSelected(event.target.files[0])
  }
  // changed this back to event.target.name need to see if this is correct
  // also I think we have this line 40 set up like we are using this.setState but I think this hook would have a different syntax than this.setState. I think line 41 would be setTitle(event.target.name=event.target.value)
  // I also think we need to turn this into a class component and pass in user because that is how we create owner on the server side

  return (
    <>
      <div className='App'>
        {file
          ? (
            <img className='displayImg' alt='uploaded file' src={file} />
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
          <Form.Group>
            <input id="fileUpload" label="Upload File Here" type='file' onChange={handleChange} />
          </Form.Group>
          <Button variant='primary' type='submit'>Submit</Button>
        </Form>
      </div>
    </>
  )
}

export default PostMeme
