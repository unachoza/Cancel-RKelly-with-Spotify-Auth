import React, { Component } from "react";
import "../App.css";
import Spotify from "spotify-web-api-js";
import axios from "axios";

const spotifyWebApi = new Spotify();

class ProblemRK extends Component {
  constructor() {
    super();
    this.state = {

      deleted: false
    };
  }

  removeSongs = (playlistID, uri) => {
    const { iofRKsong, songRouteID } = this.props;
    this.setState({ deleted: true });

    //first check if removing more than on problem
    if (iofRKsong.length > 1) {
      const multipleSongs = iofRKsong.map(index => uri[index]);
      multipleSongs.map(index => spotifyWebApi.removeTracksFromPlaylist(playlistID, [{ uri: index }]));
      songRouteID.forEach(i => {
        axios.put(`http://localhost:3001/db/songs/${i}`, {
          deleted: true
        });
      });
    }
    /// only one song
    spotifyWebApi.removeTracksFromPlaylist(playlistID, [
      { uri: uri[this.props.iofRKsong] }
    ]);
    axios.put(`http://localhost:3001/db/songs/${songRouteID}`, {
      deleted: true
    });
  };

  render() {
    const { RKSongTitle, uri, playlistId } = this.props;
    const { deleted } = this.state;

    let songs = RKSongTitle.map((song, i) => {
      return (
        <div
          className={deleted ? "animated zoomOut" : ""}
          style={{ textAlign: "left" }}
          key={i}
        >

          {song} <br></br>
          <span style={{ color: "white" }}>R. Kelly</span>
        </div>
      );
    });
    return (
      <div style={{ fontSize: "20px", fontWeight: "300" }}>
        {songs}
        <button
          id="remove-button"

          onClick={e => this.removeSongs(playlistId, uri)}>

          Remove
        </button>
      </div>
    );
  }
}

export default ProblemRK;

//singular function to check all playlist
//user feedback on deleting songs
//only post one user per session
//post songs when there are multiple problems in playlist
//close song button confusing
//rows of playlist need to maintain horizontal lines when songs open
