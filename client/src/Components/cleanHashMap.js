// import React, { Component } from 'react';
// import { SpotifyApi } from '../services/spotify-api';

// // const spotifyApi = new SpotifyApi();

// class Problems extends Component {
//   state = { problems: [] };

//   async componentDidMount() {
//     const problems = await spotifyApi.getProblemsMap();
//     this.setState({problems});
//   }

//   render() {
//     return (
//       <div className="hash-container">
//           {problem.length > 0 ? (
//             problem.map((playlist, i) => (
//               <div key={i} className="hashResults">{`The Playlist, ${playlist} has a Problem`}</div>
//             ))
//           ) : (
//             <div className="hashResults blinking">Congrats! No R Kelly songs were found!</div>
//           )}
//         </div>
//     )
//   }
// }
  
// export default Problems