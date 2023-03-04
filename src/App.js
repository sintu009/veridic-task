import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://techcrunch.com/wp-json/wp/v2/posts?per_page=20&context=embed')
      .then(response => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <h1>TechCrunch Articles</h1>

      {loading && <p>Loading...</p>}

      <div className="card-container">
        {posts.map(post => (
          <a href={post.link} target="_blank" rel="noreferrer" key={post.id} className="card">
            <img src={post.jetpack_featured_media_url} alt={post.title.rendered} />
            <div className="content">
              <h2>{post.title.rendered}</h2>
              <p>{post.excerpt.rendered}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default App;
