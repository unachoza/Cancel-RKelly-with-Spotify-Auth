import React, { Component } from "react";
import '../CSS/App.css'
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

    //create a new array of URIs without iofRKsong ***
    // must be a better way! / refactoring

    //removing one by one songs by their index;
    //also unshifting to maintain index accuracy everytime uri array gets smaller
    for (let i = 0; i < iofRKsong.length; i++) {
      uri.splice(iofRKsong[i], 1);
      uri.unshift(0);
    }
    //removing filler 0s that had to be added above
    for (let i = 0; i < iofRKsong.length; i++) {
      uri.shift();
    }

    const NewPlaylistRes = await spotifyWebApi.createPlaylist(userId, {
      name: `${playlistInfo.name} - PROBLEM FREE`
    });

    const newPlaylistID = NewPlaylistRes.id;
    spotifyWebApi.addTracksToPlaylist(newPlaylistID, uri);

    //Problem Free playlist has been created; now must unfollow Problem playlist 
    spotifyWebApi.unfollowPlaylist(playlistInfo.id)

  }

  render() {
   
    return (
      <div>
        <p style={{ color: "red" }}>
          <br></br>
          This is a public playlist that you follow. Click to make a new
          playlist without problems
        </p>
        <button onClick={() => this.createProblemFreePlaylist()}>
          Make New Playlist
        </button>
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
