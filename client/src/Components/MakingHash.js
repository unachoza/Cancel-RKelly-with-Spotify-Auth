import React, { Component } from "react";
// import "./App.css";
import Spotify from "spotify-web-api-js";
const spotifyWebApi = new Spotify();

class MakingHash extends Component {
  state = {
    playlists: [],
    problem: []
  };

  async componentDidMount() {
    const userRes = await spotifyWebApi.getMe();
    console.log(userRes);
    this.setState({
      id: userRes.id,
      name: userRes.display_name,
      email: userRes.email,
      country: userRes.country,
    });
    let offsetNum = -50;
    let playlistResults = [];

    //geting playlists ids & names only 50
    const loops = await spotifyWebApi.getUserPlaylists(this.state.id);
    this.setState({ totalPlaylists: loops.total });
    let loopsCount = Math.ceil(this.state.totalPlaylists / 50);
    for (let i = 0; i < loopsCount; i++) {
      offsetNum += 50;
      const temp = await spotifyWebApi.getUserPlaylists(
        this.state.id,
        {
          limit: 50,
          offset: offsetNum
        }
      );
      playlistResults.push.apply(playlistResults, temp.items);
      let playlistIds = [];
      let playlistNames = [];
      console.log(playlistResults);
      playlistResults.map(index => {
        playlistIds.push(index.id);
       return playlistNames.push(index.name);
      });

      //State now has all PlayListIDS and their Names
      this.setState(prevState => ({
        playlists: {
          ...prevState.playlists,
          playlistIds: [...playlistIds, playlistIds],
          playlistNames: [...playlistNames, playlistNames]
        }
      }));
      console.log("my state", this.state);
    }
    let count = 0;
    this.state.playlists.playlistIds.map(async id => {
      let tracks = await spotifyWebApi.getPlaylistTracks(id);
      tracks = tracks.items;
      let artistsObj = [];

      // getting the artist object, because the name is nested deeply
      for (let i = 0; i < tracks.length; i++) {
        artistsObj.push(tracks[i].track.artists);
      }
      let artistsNames = [];
      for (let i = 0; i < artistsObj.length; i++) {
        artistsNames.push(artistsObj[i][0].name);
      }
      console.log(artistsNames)

      ///*****************looping and getting an array of all artist names for each playlist */
      let currentPlaylistName = this.state.playlists.playlistNames[count];
      // if (artistsNames.includes("R. Kelly")) {  
      //   console.log("yes", currentPlaylistName);
      //   this.setState(prevState => ({
      //     problem: [...prevState.problem, currentPlaylistName]
      //   }));
      // } 
      console.log(this.state.problem)
      count++;
    });
  }
  componentDidUpdate() {
    const { problem } = this.state
      console.log('this renders', problem)
      if (problem.length > 1) {
        problem.map((index) => {
          console.log('I agree', index )
          return(<div>{`The Playlist, ${index} has a Problem`} </div>)
        })
      }
    }
  

  //***********find rkelly and find out what playlist the song belongs to
  ///**********FINDS RKELLY AND PRINTS PLAYLISTNAME*/

  render() {

    
      

    return (
      
      <div>

        <h1>hash</h1>
      </div>
    );
  }
}

export default MakingHash;

// edge case: what if playlist has more than 100 songs
