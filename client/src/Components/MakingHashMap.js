import React, { Component } from 'react';
import Spotify from 'spotify-web-api-js';
import LoadingSpinner from 'Components/LoadingSpinner/LoadingSpinner';
const spotifyWebApi = new Spotify();

//InitialState
const ARTIST = 'R. Kelly';

class MakingHash extends Component {
  state = {
    userPlaylists: [],
    problem: [],
    loading: false,
  };

  async componentDidMount() {
    const { id } = this.state;
    const userDetails = await spotifyWebApi.getMe();
    this.setState({
      id: userDetails.id,
      name: userDetails.display_name,
      email: userDetails.email,
      country: userDetails.country,
    });
    let offsetNum = -50,
      playlistResults = [],
      playlistIds = [],
      playlistNames = [];

    //geting playlists ids & names only 50
    if (this.state.userPlaylists.length < 0) {
      console.log('had to fetch from api');
      const userPlaylistSummary = await spotifyWebApi.getUserPlaylists(id);

      this.setState({ totalPlaylists: userPlaylistSummary.total, loading: true });
      let spotifyRequestsNeededNum = Math.ceil(this.state.totalPlaylists / 50);
      //needs to make multiple requests if user has more than 50 playlists
      for (let i = 0; i < spotifyRequestsNeededNum; i++) {
        offsetNum += 50;

        const partialUserPlaylists = await spotifyWebApi.getUserPlaylists(this.state.id, {
          limit: 50,
          offset: offsetNum,
        });
        playlistResults.push.apply(playlistResults, partialUserPlaylists.items);
        playlistResults.map((index) => {
          playlistIds.push(index.id);
          playlistNames.push(index.name);
        });
      }
      //State now has all PlayListIDS and Playlist Names
      this.setState((prevState) => ({
        userPlaylists: {
          ...prevState.userPlaylists,
          playlistIds: playlistIds,
          playlistNames: playlistNames,
        },
      }));
    }
    if (this.state.userPlaylists.playlistIds) {
      //getting the songs &aritist from each playlist
      this.state.userPlaylists.playlistIds.map(async (id) => {
        let artistsNames = [],
          artistsObj = [];

        let tracks = await spotifyWebApi.getPlaylistTracks(id);
        tracks = tracks.items;

        // getting the artist object, because the name is nested deeply
        tracks.forEach((i) => artistsObj.push(i.track.artists));
        artistsObj.forEach((obj) => artistsNames.push(obj[0].name));

        // checking if artist is in array of artists
        if (artistsNames.includes(ARTIST)) {
          const res = await spotifyWebApi.getPlaylist(id);
          console.log(res, 'if problematic');
          //saving playlist name to state, if problem present
          this.setState((prevState) => ({
            problem: prevState.problem.concat(res.name),
          }));
        }
        this.setState({ loading: false });
      });
    }
  }
  fetchUserPlaylistSummary = () => {
    if (localStorage.getItem('userPlaylistSummary')) {
      let userPlaylists = JSON.parse(localStorage.getItem('userPlaylistSummary'));
      this.setState({ userPlaylists });
      console.log('found stuff in storage');
      console.log('put it in state', this.state);
    }
  };

  render() {
    // console.log('this is what state has become', this.state);
    const { problem, loading } = this.state;
    return (
      <div className="hash-container">
        {loading && <LoadingSpinner />}
        {problem.length > 0 && !loading ? (
          problem.map((playlist, i) => (
            <div key={i} className="hashResults">{`The Playlist, ${playlist} has a Problem`}</div>
          ))
        ) : (
          <div className="hashResults blinking">Congrats! No R Kelly songs were found!</div>
        )}
      </div>
    );
  }
}

export default MakingHash;

// edge case: what if playlist has more than 100 songs
// const processArray = async (array) => {
//   for (const item of array) {
//     await delayedLog(item);
//   }
// }

//InitialState
// const ARTIST = 'R. Kelly';

// class MakingHash extends Component {
//   state = {
//     userPlaylists: [],
//     problem: [],
//     loading: false,
//   };

//   async componentDidMount() {
//     const { id } = this.state;

//     this.fetchUserPlaylistSummary();

//     let offsetNum = -50,
//       playlistResults = [],
//       playlistIds = [],
//       playlistNames = [];

//     //geting playlists ids & names only 50 playlist
//     if (this.state.userPlaylists.length < 0) {
//       console.log('had to fetch from api');
//       const userPlaylistSummary = await spotifyWebApi.getUserPlaylists(id);

//       this.setState({ totalPlaylists: userPlaylistSummary.total, loading: true });
//       let spotifyRequestsNeededNum = Math.ceil(this.state.totalPlaylists / 50);
//       //needs to make multiple requests if user has more than 50 playlists
//       for (let i = 0; i < spotifyRequestsNeededNum; i++) {
//         offsetNum += 50;

//         const partialUserPlaylists = await spotifyWebApi.getUserPlaylists(this.state.id, {
//           limit: 50,
//           offset: offsetNum,
//         });
//         playlistResults.push.apply(playlistResults, partialUserPlaylists.items);
//         localStorage.setItem('userPlaylistSummary', JSON.stringify(playlistResults));

//         playlistResults.map((index) => {
//           playlistIds.push(index.id);
//           playlistNames.push(index.name);
//         });

//         //State now has all PlayListIDS and Playlist Names
//         this.setState((prevState) => ({
//           userPlaylists: {
//             ...prevState.userPlaylists,
//             playlistIds: playlistIds,
//             playlistNames: playlistNames,
//           },
//         }));
//       }
//       //getting the songs &aritist from each playlist
//       this.state.userPlaylists.playlistIds.map(async (id) => {
//         let artistsNames = [],
//           artistsObj = [];

//         let tracks = await spotifyWebApi.getPlaylistTracks(id);
//         tracks = tracks.items;

//         // getting the artist object, because the name is nested deeply
//         tracks.forEach((i) => artistsObj.push(i.track.artists));
//         artistsObj.forEach((obj) => artistsNames.push(obj[0].name));

//         // checking if artist is in array of artists
//         if (artistsNames.includes(ARTIST)) {
//           const res = await spotifyWebApi.getPlaylist(id);
//           console.log(res, 'if problematic');
//           //saving playlist name to state, if problem present
//           this.setState((prevState) => ({
//             problem: prevState.problem.concat(res.name),
//           }));
//         }
//         this.setState({ loading: false });
//       });
//     }
//   }

//

//   render() {
//     console.log('put it in state', this.state);
//     const { problem, loading } = this.state;
//     return (
//       <div className="hash-container">
//         {loading && <LoadingSpinner />}
//         {problem.length > 0 && !loading ? (
//           problem.map((playlist, i) => (
//             <div key={i} className="hashResults">{`The Playlist, ${playlist} has a Problem`}</div>
//           ))
//         ) : (
//           <div className="hashResults blinking">Congrats! No R Kelly songs were found!</div>
//         )}
//       </div>
//     );
//   }
// }

// export default MakingHash;

//Separate massive function in to single responsibility
// 1. get users playlists
// 2. get songs and artists for playlistsList
// 3. check playlists for artists
// 4. set local storage
// change this from a component to functions / services

// edge case: what if playlist has more than 100 songs

/// ** how to setTimeOut for a api call ////
// const processArray = async (array) => {
//   for (const item of array) {
//     await delayedLog(item);
//   }
// }
