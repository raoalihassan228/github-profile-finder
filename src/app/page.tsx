'use client'
import React, { useState } from 'react';
import { FaSearch } from "react-icons/fa";

function App() {
  const [userData, setUserData] = useState({
    avatar_url: 'https://avatars.githubusercontent.com/u/139099370?v=4',
    name: 'Rao Ali Hassan',
    login: 'raoalihassan228',
    bio: 'Full Stack Developer (MERN) | Building next-gen apps with AI insights | Data Science & AI Enthusiast 💻',
    public_repos: 24,
    followers: 47,
    following: 16
  });

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (e:any) => {
    setInputValue(e.target.value);
  }

  const fetchUser = () => {
    fetch(`https://api.github.com/users/${inputValue}`)
      .then(response => response.json())
      .then(jsonData => {
        if (jsonData.message === "Not found") {
          alert("User Not Found");
        } else {
          setUserData(jsonData);
        }
      })
      .catch(error => {
        console.log("Error: ", error.message);
      });
  }

  return (
    <div className="container">
      <div className="search-container">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter Github UserName"
          className="search-input"
        />
        <div id="search" onClick={fetchUser} className='text-[19px]'>
           <FaSearch className='text-xl'/> Search User
        </div>
      </div>

      <div className="profile-card">
        <div className="main-info">
          <img src={userData.avatar_url} alt="avatar" id="prof-img" />
          <span className="name" id="name">{userData.name}</span>
          <a href={`https://github.com/${userData.login}`} id="username">@{userData.login}</a>
        </div>
        <div className="bio">
          <p id="bio">{userData.bio}</p>
          <p><span id="repo">{userData.public_repos}</span> Repositories</p>
        </div>
        <div className="follow">
          <div className="followers">
            <span className="no" id="followers">{userData.followers}</span> Followers
          </div>
          <div className="following">
            <span className="no" id="following">{userData.following}</span> Following
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
