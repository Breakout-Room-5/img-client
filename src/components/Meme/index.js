import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

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
    })
      .then((res) => {
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
    memesJSX = memes.map(meme => {
      return (
        <div key={meme._id}>
          <div style={{ textAlign: 'center', color: 'pink', border: 'solid', margin: '10px', borderColor: 'pink' }} >
            <h1>{meme.name}</h1>
            <Link to={`/uploads/${meme._id}`}>
              <img className='displayImg' src={meme.url} />
            </Link>
            <p>Creator: {meme.author}</p>
            <p>Created: {meme.createdAt.substring(0, 10)}</p>
            <p>Updated: {meme.updatedAt.substring(0, 10)}</p>
          </div>
        </div>
      )
    })
  }

  return (
    <>
      <h3 style={{ textAlign: 'center' }}>My Memes</h3>
      <ul>{memesJSX}</ul>
    </>
  )
}
export default IndexMeme
