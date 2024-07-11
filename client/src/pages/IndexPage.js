import React, { useEffect, useState } from 'react';
import Post from '../Post';
import './IndexPage.css';

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPosts();
  }, [searchTerm]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`http://localhost:4000/post/search${searchTerm ? `?title=${searchTerm}` : ''}`);
      if (response.ok) {
        const data = await response.json();
        setPosts(data);
      } else {
        console.error('Failed to fetch posts');
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSearch = (event) => {
    event.preventDefault();
    fetchPosts();
  };

  return (
    <div>
      <form className="search-container" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
      {posts.length > 0 ? (
        posts.map((post) => (
          <div key={post._id} className="post-container">
            <Post {...post} />
          </div>
        ))
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}
