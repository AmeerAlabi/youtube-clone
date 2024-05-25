import React, { useState } from 'react'
import Navbar from './Components/navbar/Navbar'
import Home from './pages/Home/Home'
import Video from './pages/Video/Video'
import { Routes , Route , Link } from 'react-router-dom'

const App = () => {
 
  const [sidebar  , setSidebar] = useState(true);

  return (
    <div>
      <Navbar setSidebar={setSidebar} />
      <Routes>
          <Route path="/" element={<Home sidebar={sidebar} />}  />
          <Route path="/video/:category/:videoId" element={<Video />} />
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
    </div>
  )
}

export default App
