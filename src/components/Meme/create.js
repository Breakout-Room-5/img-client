import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { createMeme } from '../../api/meme'

class CreateMeme extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '',
      selectedFile: null

    }
  }

    handleTitle = (event) => {
      this.setState({ [event.target.name]: event.target.value })
    }

    onFileChange = (event) => {
      this.setState({
        selectedFile: event.target.files[0]
      })
    }

    handleSubmit = (event) => {
      event.preventDefault()
      console.log(event.target)
      const data = new FormData()
      const { user, msgAlert } = this.props
      data.append('upload', this.state.selectedFile)
      console.log(this.state.selectedFile)
      console.log(this.state.title)
      console.log(user)
      console.log(user.createdAt)
      createMeme(data, user)
        .then(console.log(this.state.title))
      // .then(() => this.setState({ created: true }))
      // .then((res) => this.setState(res.data.file))
        .then(console.log(this.state.selectedFile))
        .then(() => {
          msgAlert({
            heading: 'Meme created',
            message: 'Nice meme!',
            variant: 'success'
          })
        })
        .catch((error) => {
          msgAlert({
            heading: 'Fail to Create Meme',
            message: 'Error: ' + error.message,
            variant: 'danger'
          })
        })
    }

    render () {
      const { title } = this.state

      //   if (created) {
      //     return <Redirect to={'/movies'} />
      //   }
      return (
        <div className='App'>
          {/* {file.url
            ? (
              <img className='displayImg' alt='uploaded file' src={file.url} />
            )
            : (
              ''
            )} */}
          {/* {loading ? (<img alt="loading gif" src="https://miro.medium.com/max/882/1*9EBHIOzhE1XfMYoKz1JcsQ.gif"/>) : ''} */}
          {/* <div className='col-sm-10 col-md-8 mx-auto mt-5'> */}
          <h3>Create Meme</h3>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId='title'>
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                name='title'
                value={title}
                placeholder='Title'
                onChange={this.handleTitle}
              />
            </Form.Group>
            <Form.Group>
              {/* <Form.File type="file" id="fileUpload" label="Upload File Here" onChange={this.handleChange}/> */}
              <input type='file' onChange={this.onFileChange} />
            </Form.Group>
            <Button variant='success' type='submit'>Submit</Button>
          </Form>
          {/* </div> */}
        </div>
      )
    }
}

export default CreateMeme
