import React, { Component } from "react";
import "../App.css";
import Spotify from "spotify-web-api-js";

const spotifyWebApi = new Spotify();

class CreatePlaylist extends Component {
  async createProblemFreePlaylist() {

    const { playlistInfo, iofRKsong } = this.props;
    let uri = [];
    const response = await spotifyWebApi.getPlaylistTracks(playlistInfo.id);
    console.log(response);
    response.items.map(async item => {
      uri.push(item.track.uri)
    })
    
//need to create a new array of URIs without iofRKsong
// splice returns an array of removed items
//I need to mutate original array, and remove the items from original 
      
// try filter 
// creates an array filled with all array elements that pass a test (provided as a function).
      for (let i = 0; i < iofRKsong.length; i++){
        uri.splice(iofRKsong[i], 1)
        console.log(i)
      }
      console.log(uri)
      // uri.filter(uri => uri)
      // iofRKsong.forEach((i) =>
      //   uri.splice(i, 1))
      // let newURI = uri;

    //   const res = await spotifyWebApi.createPlaylist(this.props.userId, {
    //     name: `${playlistInfo.name} - Problem Free`
    //   })
    //   console.log(res)
    //   const newPlaylistID = res.id;
    //   console.log(newPlaylistID, uri.length);
    //   spotifyWebApi.addTracksToPlaylist(newPlaylistID, newURI);
     
    // })
  }

  render() {
    console.log("arrived on his page");
    console.log("what is props", this.props);
    // this.createProblemFreePlaylist()
    return (
      <div>
        <p style={{ color: "red" }}>
          {" "}
          This is a public playlist that you follow. Click to make a new
          playlist without problems
        </p>
        <button onClick={()=> this.createProblemFreePlaylist()}>Make New Playlist</button>
        {/* <h1>Identify playlist</h1> */}
        {/* <h1>copy songs from playlist in array</h1> */}
        {/* <h1>filter out rkelly, splice</h1> */}
        {/* <h1>capture playlist name and add "(problem-free)"</h1> */}
        {/* <h1>create new playist with new name</h1> */}
        {/* <h1>add songsArray to created playlist with </h1> */}
        {/* <h2>Add the current user as a follower of Problem-free playlist</h2>
                <h2> Removes the current user as a follower from public playlist</h2> */}
      </div>
    );
  }
}

export default CreatePlaylist;

//get tracks  spotifyWebApi.getPlaylistTracks(playlistID)

// unfollowPlaylist(playlistId: string, callback?: ResultsCallback<SpotifyApi.UnfollowPlaylistReponse>) : Promise<SpotifyApi.UnfollowPlaylistReponse>;

// followPlaylist(playlistId: string, options?: Object, callback?: ResultsCallback<SpotifyApi.FollowPlaylistReponse>) : Promise<SpotifyApi.FollowPlaylistReponse>;

//createPlaylist(userId: string, options?: Object, callback?: ResultsCallback<SpotifyApi.CreatePlaylistResponse>) : Promise<SpotifyApi.CreatePlaylistResponse>;

// addTracksToPlaylist(playlistId: string, uris: string[], options?: Object, callback?: ResultsCallback<SpotifyApi.AddTracksToPlaylistResponse>) : Promise<SpotifyApi.AddTracksToPlaylistResponse>;
