
import React from 'react'
import Sparkles from 'react-sparkle'
function Home () {
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Sparkles flicker={false} />
        <h1 className='rainbow'>MEME CENTRAL</h1>
        <h4>Created By</h4>
        <p>Ruo Zheng, CJ Lamborn, Cody Sanders, Maura Webber</p>
        <img
          className='memeCentralImage'
          src='https://i.imgur.com/2nAP1jZ.png'></img>
      </div>
    </>
  )
}

export default Home
