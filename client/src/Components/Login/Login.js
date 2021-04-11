import React from 'react';
import 'Components/Login/Login.css';

const Login = (props) => {
  return (
    <a href="http://localhost:8888">
      <button style={{ margin: 'auto' }} onClick={(e) => props.route(e)}>
        {' '}
        Login to Spotify
      </button>
    </a>
  );
};

export default Login;
