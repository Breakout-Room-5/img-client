
import React, { useState, useEffect } from 'react'
import { Modal, Button } from 'react-bootstrap'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import { Redirect, Link, withRouter } from 'react-router-dom'

function ShowMeme ({ user, match, msgAlert }) {
  const [meme, setMeme] = useState(null)
  const [deleted, setDeleted] = useState(false)
  const [show, setShow] = useState(false)
  // const [editToggle, setEditToggle] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  useEffect(() => {
    axios({
      url: `${apiUrl}/uploads/${match.params.id}`,
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
        setMeme(res.data.upload)
      })
  }, [])

  const destroy = () => {
    axios({
      url: `${apiUrl}/uploads/${match.params.id}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(() => setDeleted(true))
      .then(() => {
        msgAlert({
          heading: 'Deleted',
          message: 'Meme Yeeted',
          variant: 'success'
        })
      })
      .catch(error => {
        msgAlert({
          heading: 'It\'s not going anywhere!',
          message: 'Delete error: ' + error.message,
          variant: 'danger'
        })
      })
  }
  // const onEdit = () => {
  //   setEditToggle(!editToggle)
  // }
  if (!meme) {
    return <p>Loading...</p>
  }

  if (deleted) {
    return (
      <Redirect
        to={{ pathname: '/my-memes', state: { msg: 'You successfully deleted your Meme' } }}
      />
    )
  }
  // if (editToggle === false) {
  //   return (
  //     <Redirect to={{ pathname: '/my-memes/' + match.params.id }} />
  //   )
  // }

  return (
    <div>
      <h1>{meme.name}</h1>
      <img className='displayImg' src={meme.url} />
      <p>Creator: {meme.author}</p>
      <p>Created: {meme.createdAt.substring(0, 10)}</p>
      <p>Updated: {meme.updatedAt.substring(0, 10)}</p>

      <Button variant='primary' onClick={handleShow}>Delete</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure?</Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>Close</Button>
          <Button variant='primary' onClick={destroy}>Delete</Button>
        </Modal.Footer>
      </Modal>

      <Link to={'/my-memes/' + match.params.id + '/edit'}>
        <Button className="btn btn-primary" style={{ marginLeft: '5px' }} >Edit Meme</Button>
      </Link>

    </div>
  )
}

export default withRouter(ShowMeme)
