import {format} from "date-fns";
import {Link} from "react-router-dom";
import "./Post.css";


function calculateReadingTime(content) {
  const wordsPerMinute = 50; 
  const textLength = content.split(' ').length; 
  const readingTime = Math.ceil(textLength / wordsPerMinute);
  return readingTime;
}

export default function Post({_id, title, summary, cover, content, createdAt, author}) {
  const readingTime = calculateReadingTime(content);

  return (
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={'http://localhost:4000/' + cover} alt=""/>
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          <span className="author">{author.username}</span>
          <span className="post-time">{format(new Date(createdAt), 'MMMM dd, yyyy')}</span>
          <span className="reading-time">Read time: {readingTime}min read</span>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}

