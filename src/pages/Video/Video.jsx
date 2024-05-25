import React from 'react'
import './Video.css'
import PlayVideo from '../../Components/playvideo/PlayVideo'
import Recommended from '../../Components/recommended/Recommended'
import { useParams } from 'react-router-dom'
const Video = () => {
 
  const {videoId , categoryId } = useParams();

  return (
    <div className='play-container'>
      <PlayVideo videoId={videoId} />
      <Recommended categoryId={categoryId } />
    </div>
  )
}

export default Video
