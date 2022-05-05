import React, { useState, useEffect } from 'react'
// import { indexMemes } from '../../api/meme'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
// import './App.css'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'

function IndexAllMeme ({ user, msgAlert }) {
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
    })
      .then((res) => {
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
    memesJSX = memes.map(meme => {
      return (
        <div key={meme._id}>
          <h1>{meme.name}</h1>
          <img className='displayImg' src={meme.url} />
          <p>Creator: {meme.author}</p>
          <p>Created: {meme.createdAt.substring(0, 10)}</p>
          <p>Updated: {meme.updatedAt.substring(0, 10)}</p>
        </div>
      )
    })
  }

  return (
    <>
      <h3>All the memes:</h3>
      <ul>{memesJSX}</ul>
    </>
  )
}
export default IndexAllMeme
