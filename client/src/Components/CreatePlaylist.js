import React, { Component } from "react";
import "../App.css";
import Spotify from "spotify-web-api-js";

const spotifyWebApi = new Spotify();

class CreatePlaylist extends Component {
  async createProblemFreePlaylist() {
    const { playlistInfo } = this.props;
    let trackNames = [];
    let artistsNamesArr = [];
    let artistObjArr = [];
    let uri = [];
    const playlistName = "00 hits";
    const response = await spotifyWebApi.getPlaylistTracks(playlistInfo.id);
    console.log(response);
    response.items.map(item => {
      uri.push(item.track.uri);
      trackNames.push(item.track.name);
      artistObjArr.push(item.track.artists);
    });
    artistObjArr.map(artist => {
      artistsNamesArr.push(artist[0].name);
    });
    
    const indexOfAll = (arr, val) =>
      arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);
    let RKindexies = indexOfAll(artistsNamesArr, "R. Kelly");

    uri.splice(RKindexies, 1);
    console.log(uri.length, "less", RKindexies);
    let newURI = uri;

   const res = await spotifyWebApi.createPlaylist("1224023576", {
        name: `${playlistInfo.name} - Problem Free`
      })
        const newPlaylistID = res.id;
        console.log(newPlaylistID, uri.length);
        spotifyWebApi.addTracksToPlaylist(newPlaylistID, newURI);
     
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
        <button>Make New Playlist</button>
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
