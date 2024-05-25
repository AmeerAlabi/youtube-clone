import React, { useEffect, useState } from 'react';
import './Recommended.css';
import { API_KEY, value_converter } from '../../data';
import { Link } from 'react-router-dom';

const Recommended = ({ categoryId = '1' }) => {  // Provide a default categoryId if not passed
  const [apiData, setApiData] = useState([]);

  const fetchData = async () => {
    if (!categoryId) {
      console.error('Invalid categoryId:', categoryId);
      return;
    }

    const relatedUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=US&videoCategoryId=${categoryId}&maxResults=40&key=${API_KEY}`;
    try {
      const response = await fetch(relatedUrl);
      const data = await response.json();
      setApiData(data.items);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [categoryId]);

  return (
    <div className='recommended'>
      {apiData.map((item) => (
        <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className="side-video-list" key={item.id}>
          <img src={item.snippet.thumbnails.default.url} alt={item.snippet.title} className=' rounded-[7px] ' />
          <div className="vid-info ml-4">
            <h4 className=' font-bold'>{item.snippet.title}</h4>
            <p>{item.snippet.channelTitle}</p>
            <p>{value_converter(item.statistics.viewCount)} views</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Recommended;
