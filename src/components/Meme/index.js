import React, { useState, useEffect } from 'react'
// import { indexMemes } from '../../api/meme'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

// import { Redirect } from 'react-router-dom'
// import './App.css'
// import Form from 'react-bootstrap/Form'
// import Button from 'react-bootstrap/Button'

function IndexMeme ({ user }) {
//   const [selected, setSelected] = useState({})
  const [memes, setMemes] = useState([])

  useEffect(() => {
    console.log(user)
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
        console.log(res.data.memes)
      })
    //   .then(() => {
    //     msgAlert({
    //       heading: 'Index success',
    //       message: 'Woot indexed',
    //       variant: 'success'
    //     })
    //   })
      .then(console.log(memes))
      .catch(console.error)
    //   => {
    // msgAlert({
    //   heading: 'Index fail',
    //   message: 'Index error: ' + error.message,
    //   variant: 'danger'
    // })
    //   })
  }, [])
  // const { memes } = this.state
  //   if (memes === null) {
  //     return 'Loading...'
  //   }
  let memesJSX
  if (memes) {
    memesJSX = memes.map(meme => {
      return (
        <li key={meme._id}>
          <h2>{meme.name}</h2>
          <p>Created At{meme.createdAt}</p>
          <p>Update At{meme.updatedAt}</p>
          <p>Owner{meme.owner}</p>
          <img src={meme.url}/>
          <Link to={`/uploads/${meme._id}`}>Show Meme</Link>
        </li>
      )
    })
  }
  //   const indexMeme = memes.map(meme => (
  //     <li key={meme._id}>
  //       <Link to={`/memes/${meme._id}`}>{meme.title}</Link>
  //     </li>
  //   ))
  return (
    <>
      <h3>All the memes:</h3>
      <ul>{memesJSX}</ul>
    </>
  )
}
export default IndexMeme
