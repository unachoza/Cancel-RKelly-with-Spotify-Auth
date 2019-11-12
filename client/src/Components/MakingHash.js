import React, { Component } from "react";
// import "./App.css";
import Spotify from "spotify-web-api-js";
const spotifyWebApi = new Spotify();

class MakingHash extends Component {
  state = {
    playlists: []
  };

  async componentDidMount() {
    // const {user} = this.state
    spotifyWebApi.getMe();
    const userRes = await spotifyWebApi.getMe();
    console.log(userRes);
    this.setState({
      id: userRes.id,
      name: userRes.display_name,
      email: userRes.email,
      country: userRes.country,
      totalPlaylists: userRes.total
    });
    console.log("this is stateu", this.state);
    let offsetNum = -50;
    let playlistResults = [];
      let playlistPartialResults = [];
      
    //geting playlists ids & names only 50
    const loops = await spotifyWebApi.getUserPlaylists(this.state.id);
    this.setState({ totalPlaylists: loops.total });
    let loopsCount = Math.ceil(this.state.totalPlaylists / 50);
    for (let i = 0; i < loopsCount; i++) {
        offsetNum += 50;
        
      const temp = await spotifyWebApi.getUserPlaylists("8mcnehzy9pqb74j65vsfzhluu", {
        limit: 50,
        offset: offsetNum
      })
      playlistResults.push.apply(playlistResults, temp.items);
      let playlistIds = [];
        let playlistNames = [];
        console.log(playlistResults)
      playlistResults.map(index => {
        playlistIds.push(index.id);
        playlistNames.push(index.name);
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
      let count = 0
      this.state.playlists.playlistIds.map( async (id)  =>  {
          let tracks = await spotifyWebApi.getPlaylistTracks(id)
          tracks = tracks.items
          let artistsObj = []
          for (let i = 0; i < tracks.length; i++){
            artistsObj.push(tracks[i].track.artists)
          } let artistsNames = []
          console.log(artistsObj)
          for (let i = 0; i < artistsObj.length; i++) {
            artistsNames.push(artistsObj[i][0].name)
          }

          ///*****************looping and getting an array of all artist names for each playlist */
          console.log(artistsNames)
  
          
      }) 

      console.log(count)
     let  currentPlaylistName = this.state.playlists.playlistNames[0]
      console.log(currentPlaylistName)
    const song =  await spotifyWebApi.getPlaylistTracks(
        this.state.playlists.playlistIds.map((indexOfPlaylist) => {
            let artistsFromOnePlaylist = []

     song.items.map((index) => {
         artistsFromOnePlaylist.push(index.track.artists[0].name)
     })
        })
        
        
        [1]);
      console.log(song.items);
      let artistsFromOnePlaylist = []

     song.items.map((index) => {
         artistsFromOnePlaylist.push(index.track.artists[0].name)
     })
      
      //***********find rkelly and find out what playlist the song belongs to
      ///**********FINDS RKELLY AND PRINTS PLAYLISTNAME*/
      
      if (artistsFromOnePlaylist.includes('R. Kelly')) {
          console.log("The Playlist", currentPlaylistName, " has a Problem")
          this.setState({
              problem: currentPlaylistName
          })
          
      }
      
      //from what playlist
      console.log(artistsFromOnePlaylist)

  }
    

  render() {
    return <div>{`The Playlist, ${this.state.problem},  has a Problem`}</div>;
  }
}

export default MakingHash;


// edge case: what if playlist has more than 100 songs