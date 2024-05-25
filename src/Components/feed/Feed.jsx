import React, { useEffect, useState } from 'react'
import './Feed.css'
import nail1 from '../../assets/thumbnail1.png'
import nail2 from '../../assets/thumbnail2.png'
import nail3 from '../../assets/thumbnail3.png'
import nail4 from '../../assets/thumbnail4.png'
import nail5 from '../../assets/thumbnail5.png'
import nail6 from '../../assets/thumbnail6.png'
import nail7 from '../../assets/thumbnail7.png'
import nail8 from '../../assets/thumbnail8.png'
import { Link } from 'react-router-dom'
import { API_KEY, value_converter } from '../../data'
import moment from 'moment'

const Feed = ({category}) => {
 

    const [ data , setData ] = useState([]);

    const getData = async () => {
        const  videoUrl = ` https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY} `
        await fetch ( videoUrl)
        .then(response=>response.json())
        .then(data=>setData(data.items))
    }

 useEffect(() => {
    getData();
 } , [category])

  return (
    <div className="feed   ">
        {data.map((item , index) => {
            return(
    <Link to={`video/${item.snippet.categoryId}/${item.id}`} className='card'>
        <img src={item.snippet.thumbnails.medium.url} alt="" />
        <h2 className=' font-bold'>{item.snippet.title}</h2>
        <h3>{item.snippet.channelTitle}</h3>
        <p> {value_converter(item.statistics.viewCount)} Views &bull; {moment(item.snippet.publishedAt).fromNow()} </p>
    </Link>
            )
 })}
  
    </div>

  )
}

export default Feed
