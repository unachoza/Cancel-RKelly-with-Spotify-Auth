import React, { Component } from "react";
import Spotify from "spotify-web-api-js";
const spotifyWebApi = new Spotify();

class MakingHash extends Component {
  state = {
    playlists: [],
    problem: []
  };

  async componentDidMount() {
    const {id} = this.state
    const userRes = await spotifyWebApi.getMe();
    this.setState({
      id: userRes.id,
      name: userRes.display_name,
      email: userRes.email,

      country: userRes.country
    });
    let offsetNum = -50;
    let playlistResults = [];

    //geting playlists ids & names only 50
    const loops = await spotifyWebApi.getUserPlaylists(id);
    this.setState({ totalPlaylists: loops.total });
    let loopsCount = Math.ceil(this.state.totalPlaylists / 50);
    //needs to loop if user has more than 50 playlists
    for (let i = 0; i < loopsCount; i++) {
      offsetNum += 50;

      const temp = await spotifyWebApi.getUserPlaylists(this.state.id, {
        limit: 50,
        offset: offsetNum
      });
      playlistResults.push.apply(playlistResults, temp.items);
      let playlistIds = [];
      let playlistNames = [];
      playlistResults.map(index => {
        playlistIds.push(index.id);

        playlistNames.push(index.name);

      });

      //State now has all PlayListIDS and their Names
      this.setState(prevState => ({
        playlists: {
          ...prevState.playlists,

          playlistIds: playlistIds,
          playlistNames: playlistNames
        }
      }));
    }
    //getting the songs &aritist from each playlist
    this.state.playlists.playlistIds.map(async id => {
      let tracks = await spotifyWebApi.getPlaylistTracks(id);
      tracks = tracks.items;
      let artistsObj = [];

      // getting the artist object, because the name is nested deeply
      tracks.forEach(i => artistsObj.push(i.track.artists));
      let artistsNames = [];
      artistsObj.forEach(obj => artistsNames.push(obj[0].name));

      // checking if rkelly is in array of artists
      if (artistsNames.includes("R. Kelly")) {
        const res = await spotifyWebApi.getPlaylist(id);
        //saving playlist name to state, if problem present
        this.setState(prevState => ({
          problem: prevState.problem.concat(res.name)
        }));
      }
    });
  }


  //***********find rkelly and find out what playlist the song belongs to
  ///**********FINDS RKELLY AND PRINTS PLAYLISTNAME*/


 

  render() {

const {problem } = this.state
    return (
      <div className="hash-container">
        {problem.length > 0 ? problem.map((playlist, i) => <div key={i}className="hashResults" >{`The Playlist, ${playlist} has a Problem`}</div>)
        : <div className="hashResults blinking" >Congrats! No R Kelly songs were found!</div>}
       
      </div>
    );
  }
}

export default MakingHash;

// edge case: what if playlist has more than 100 songs
