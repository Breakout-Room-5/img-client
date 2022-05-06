
import React from 'react'
import Sparkles from 'react-sparkle'
function Home () {
  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <Sparkles flicker={false} />
        <h1 id= 'text-animate'className='main-title'>MEME CENTRAL</h1>
        <h4>Created By</h4>
        <img alt='loading gif' src='https://i.gifer.com/XqyL.gif' width='50'></img>
        <p>Ruo Zheng, CJ Lamborn, Cody Sanders, Maura Webber</p>
        <img
          className='memeCentralImage'
          src='https://i.imgur.com/2nAP1jZ.png'></img>
      </div>
    </>
  )
}

export default Home
