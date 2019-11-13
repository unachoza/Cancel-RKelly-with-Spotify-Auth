import React, { Component } from "react";
import "../App.css";
import Spotify from "spotify-web-api-js";
import Songs from "./Songs";
import ProblemRK from "./ProblemRK";
import axios from "axios";

const spotifyWebApi = new Spotify();

class PlaylistSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSongs: false,
      items: [],
      RKSongTitle: [],
      iofRKsong: [],
      uri: [],
      songRouteID: []
    };
  }

  //getting list of tracks in User's Playlists
    async listTracksFromPlaylists(playlistID) {
        this.setState(prevState => ({
            showSongs: !prevState.showSongs}))
    //     this.state.showSongs
    //   ? this.setState({ showSongs: false })
    //   : this.setState({ showSongs: true });
      

    //saving variables of neccesary data points in response obj
    const response = await spotifyWebApi.getPlaylistTracks(playlistID);
    let uri = [];
    let trackNames = [];
    let artistObjArr = [];
    let artistsNamesArr = [];
    let items = [];
    response.items.map(item => {
      artistObjArr.push(item.track.artists);
      trackNames.push(item.track.name);
      items.push(item);
      uri.push(item.track.uri);
      return this.setState({ items, uri });
    });
    artistObjArr.map(artist => artistsNamesArr.push(artist[0].name));
    this.searchForSongs(artistsNamesArr, trackNames);
  }
    
  indexOfAll = (arr, val) =>
    arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);

  async searchForSongs(artistsNamesArr, trackNames) {
    let RKSongTitle = [];
    let iofRKsong = this.indexOfAll(artistsNamesArr, "R. Kelly");

    //checking if the playlist is public
    iofRKsong.length ?
      this.props.CurrentUserid !== this.props.playlistOwnerId &&
     console.log(false)
      :console.log("this playlist is yours");

    for (let i = 0; i < iofRKsong.length; i++) {
      RKSongTitle.push(trackNames[iofRKsong[i]]);
    }

    this.setState({ RKSongTitle, iofRKsong });
    //needs to be somewhere else post only if i of RK has length
    const res = await axios.post("http://localhost:3001/db/songs", {
        name: trackNames[iofRKsong],
        artist: "R Kelly",
        deleted: false
      })
        console.log(res.data.data.id);
        this.setState({songRouteID: res.data.data.id});
        if (iofRKsong.length > 1) {
          iofRKsong.forEach(i => {
            axios.post("http://localhost:3001/db/songs", {
              name: trackNames[i],
              artist: "R Kelly",
              deleted: false
            });
          });
        }
  }

    render() {
      console.log(this.state.showSongs)
    const { RKSongTitle, showSongs, items, uri, iofRKsong } = this.state;
    const { playlistInfo } = this.props;
    let buttonText = showSongs ? "CHECK SONGS" : "CLOSE SONGS";
    return (
      <div
        className={
          showSongs ? "playlist-container-closed" : "playlist-container-open"
        }
      >
        <img
          className="album-image"
          src={
            playlistInfo.images.length
              ? playlistInfo.images[0].url
              : "https://res.cloudinary.com/dh41vh9dx/image/upload/v1568335617/Big_Note-512.png"
          }
          alt="album art"
        />
        <br></br>
        <div className="songs-in-playlist-container-open">
          {playlistInfo.name} <br></br>
          <button onClick={()=> this.listTracksFromPlaylists(playlistInfo.id)}>
            {buttonText}
          </button>
          {iofRKsong > 0 && (
            <div
              style={{ color: "darkred", fontSize: "20px", fontWeight: "300" }}
            >
              This is a problem:
            </div>
          )}
          {RKSongTitle.length > 0 && (
            <ProblemRK
              songRouteID={this.state.songRouteID}
              RKSongTitle={RKSongTitle}
              iofRKsong={iofRKsong}
              playlistId={playlistInfo.id}
              uri={uri}
            />
          )}
          {iofRKsong > 0 && <hr></hr>}
          {items && <Songs items={items} showSongs={showSongs} />}
        </div>
      </div>
    );
  }
}

export default PlaylistSingle;
