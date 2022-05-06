import React, { useState, useEffect } from 'react'
// import { indexMemes } from '../../api/meme'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Card } from 'react-bootstrap'
// import './App.css'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'

function IndexAllMeme ({ user }) {
  //   const [selected, setSelected] = useState({})
  const [memes, setMemes] = useState([])
  useEffect(() => {
    console.log(user)
    axios({
      url: `${apiUrl}/uploads/all`,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'multipart/form-data'
      }
      // pass in, fire request, send me the arrays, filter this list for users =
      // filter => resource === user id
      // new array meet conditions
      // pass that array to map
    }).then((res) => {
      setMemes(res.data.uploads)
      console.log(res.data.memes)
    })
    // .then(() => {
    //   msgAlert({
    //     heading: 'Success!',
    //     message: 'This is everyone\'s image',
    //     variant: 'success'
    //   })
    // })
    // .catch((error) => {
    //   msgAlert({
    //     heading: 'Oops',
    //     message: 'Index error: ' + error.message,
    //     variant: 'danger'
    //   })
    // })
  }, [])

  let memesJSX
  if (memes) {
    memesJSX = memes.map((meme) => {
      return (
        <div key={meme._id}>
          <Card className='memecard' style={{ width: '40rem' }}>
            <Card.Title className='rainbow'>{meme.name}</Card.Title>
            <Card.Img variant='top' src={meme.url} />
            <Card.Body>
              <Card.Text>
                <p>Creator: {meme.author}</p>
              </Card.Text>
              <Card.Text>Created: {meme.createdAt.substring(0, 10)}</Card.Text>
              <Card.Text>Updated: {meme.updatedAt.substring(0, 10)}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      )
    })
  }

  return (
    <>
      <h3 style={{ textAlign: 'center', fontSize: '80px' }}>THE MEME CENTRAL</h3>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ul style={{ display: 'flex', flexDirection: 'column-reverse', gap: '50px' }}>
          {memesJSX}
        </ul>
      </div>
    </>
  )
}
export default IndexAllMeme
