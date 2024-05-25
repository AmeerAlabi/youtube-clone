import React, { useEffect, useState } from 'react';
import './PlayVideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import user_profile from '../../assets/user_profile.jpg';
import { API_KEY, value_converter } from '../../data';
import moment from 'moment';
import { useParams } from 'react-router-dom';

const PlayVideo = () => {


  const {videoId} = useParams();

  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);

  const fetchVideoData = async () => {
    const videoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;
    try {
      const response = await fetch(videoUrl);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        setApiData(data.items[0]);
      } else {
        throw new Error('Video not found');
      }
    } catch (error) {
      setError(error.message);
      console.error('Fetch error:', error);
    }
  };

  const fetchChannelData = async (channelId) => {
    const channelUrl = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${channelId}&key=${API_KEY}`;
    try {
      const response = await fetch(channelUrl);
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        setChannelData(data.items[0]);
      } else {
        throw new Error('Channel not found');
      }
    } catch (error) {
      console.error('Fetch channel error:', error);
    }
  };

  const fetchCommentData = async (videoId) => {
    const commentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
    try {
      const response = await fetch(commentUrl);
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        setCommentData(data.items);
      } else {
        throw new Error('Comments not found');
      }
    } catch (error) {
      console.error('Fetch comments error:', error);
    }
  };

  useEffect(() => {
    if (videoId) {
      fetchVideoData();
    } else {
      setError('Invalid video ID');
    }
  }, [videoId]);

  useEffect(() => {
    if (apiData) {
      fetchChannelData(apiData.snippet.channelId);
      fetchCommentData(videoId);
    }
  }, [apiData]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!apiData) {
    return <div>Loading...</div>;
  }

  return (
    <div className='play-video'>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <h3>{apiData.snippet.title}</h3>
      <div className="play-video-info">
        <p>
          {value_converter(apiData.statistics.viewCount)} Views &bull; {moment(apiData.snippet.publishedAt).fromNow()}
        </p>
        <div>
          <span>
            <img src={like} alt="Like" />
            {value_converter(apiData.statistics.likeCount)}
          </span>
          <span>
            <img src={dislike} alt="Dislike" />
          </span>
          <span>
            <img src={share} alt="Share" />
            Share
          </span>
          <span>
            <img src={save} alt="Save" />
            Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={channelData ? channelData.snippet.thumbnails.default.url : ""} alt="Publisher" />
        <div>
          <p>{apiData.snippet.channelTitle}</p>
          <span>{channelData ? value_converter(channelData.statistics.subscriberCount) : "1M"} subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>{apiData.snippet.description.slice(0, 250)}</p>
        <hr />
        <h4>{apiData ? value_converter(apiData.statistics.commentCount) : 102} Comments</h4>
        {commentData.map((comment) => (
          <div className="comment" key={comment.id}>
          <img src={comment.snippet.topLevelComment.snippet.authorProfileImageUrl || user_profile} alt="User" />

            <div>
              <h3>{comment.snippet?.topLevelComment?.snippet?.authorDisplayName} <span>{moment(comment.snippet?.topLevelComment?.snippet?.publishedAt).fromNow()}</span></h3>
              <p>{comment.snippet?.topLevelComment?.snippet?.textOriginal}</p>
              <div className="comment-action">
                <img src={like} alt="Like" />
                <span>{value_converter(comment.snippet?.topLevelComment?.snippet?.likeCount)}</span>
                <img src={dislike} alt="Dislike" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayVideo;
