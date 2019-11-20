import React, { Component } from "react";
import "../App.css";
import Spotify from "spotify-web-api-js";
import axios from "axios";

const spotifyWebApi = new Spotify();

class ProblemRK extends Component {
  constructor(props) {
    super(props);
    this.state = {

      deleted: false
    };
  }
  removeSongs = (playlistID, uri) => {
    const { iofRKsong, songRouteID } = this.props;
    this.setState({ deleted: true });

    //first check if removing more than on problem
      const multipleSongs = iofRKsong.map(index => uri[index]);
      multipleSongs.map(index => spotifyWebApi.removeTracksFromPlaylist(playlistID, [{ uri: index }]));
      songRouteID.forEach(i => {
        axios.put(`http://localhost:3001/db/songs/${i}`, {
          deleted: true
        });
      });
 
  };
  isProblemPersonal = async () => {
    const res = await spotifyWebApi.getPlaylist(this.props.playlistID)
    console.log(res)
}
  render() {

    const { RKSongTitle, uri, playlistId } = this.props;
    const { deleted } = this.state;
const
    songs = RKSongTitle.map((song, i) => {
      return (
        <div
          className={deleted ? "animated zoomOut" : ""}
          style={{ textAlign: "left" }}
          key={i}
        >
{this.isProblemPersonal}
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
