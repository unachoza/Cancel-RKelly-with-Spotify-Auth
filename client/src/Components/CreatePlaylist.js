import React, { Component } from "react";
import "../App.css";
import Spotify from "spotify-web-api-js";

const spotifyWebApi = new Spotify();

class CreatePlaylist extends Component {
  async createProblemFreePlaylist() {
    const { playlistInfo, iofRKsong, userId } = this.props;
    let uri = [];
    const response = await spotifyWebApi.getPlaylistTracks(playlistInfo.id);
    response.items.map(async item => {
      uri.push(item.track.uri);
    });

    //create a new array of URIs without iofRKsong

    // ************ Current Error, 
    // each time this loops, uri array length is decrementing because of splice, 
    // making the iofRKsong indexes off by one / one more following each new loop ***
    // removeArr[0, 8]
    // uri length 10
    // removeArr [8-1]
    // uri length 9

    for (let i = 0; i < iofRKsong.length; i++) {
      console.log('this song should be removed', iofRKsong[i], uri)
      uri.splice(iofRKsong[i], 1);
      uri.unshift(0)
    }
    console.log(uri)
    for (let i = 0; i < iofRKsong.length; i++){
      uri.shift()
    }
    console.log(uri);

      const NewPlaylistRes = await spotifyWebApi.createPlaylist(userId, {
        name: `${playlistInfo.name} - 4th try`
      })
      console.log(NewPlaylistRes)
      const newPlaylistID = NewPlaylistRes.id;
    
    const res = await spotifyWebApi.addTracksToPlaylist(newPlaylistID, uri);
    console.log(res)

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
        <button onClick={() => this.createProblemFreePlaylist()}>
          Make New Playlist
        </button>
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
