import React from 'react';
import 'Components/Login/Login.css';

const Login = ({ route }) => {
  return (
    <a href="http://localhost:8888">
      <button style={{ margin: 'auto' }} onClick={(e) => route(e)}>
        {' '}
        Login to Spotify
      </button>
    </a>
  );
};

export default Login;
