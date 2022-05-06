import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function IndexMeme ({ user, msgAlert }) {
  const [memes, setMemes] = useState([])

  useEffect(() => {
    axios({
      url: `${apiUrl}/uploads`,
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
    })
    // .then(() => {
    //   msgAlert({
    //     heading: 'Your Memes',
    //     message: 'Nice collection!',
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
            <Link to={`/my-memes/${meme._id}`}>
              <Card.Img variant='top' src={meme.url} />
            </Link>
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
      <h3 style={{ textAlign: 'center', fontSize: '80px' }}>MY OWN MEME CENTRAL</h3>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <ul style={{ display: 'flex', flexDirection: 'column-reverse', gap: '50px' }}>
          {memesJSX}
        </ul>
      </div>
    </>
  )
}
export default IndexMeme
