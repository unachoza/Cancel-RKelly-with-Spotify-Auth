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
      showSongs: true,
      items: [],
      RKSongTitle: [],
      iofRKsong: [],
      uri: [],
      publicPlaylistArr: [],
      songRouteID: []
    };
  }
  

  //getting list of tracks in User's Playlists
  listTracksFromPlaylists = async playlistID => {
    this.setState(prevState => ({
      showSongs: !prevState.showSongs
    }));
    const response = await spotifyWebApi.getPlaylistTracks
      (playlistID);
    console.log(response)
    let uri = [];
    let trackNames = [];
    let artistObjArr = [];
    let artistsNamesArr = [];
    let items = [];
    response.items.map(item => {
      artistObjArr.push(item.track.artists);
      trackNames.push(item.track.name);
      items.push(item.track);
      uri.push(item.track.uri);
      return this.setState({ items, uri });
    });
    artistObjArr.map(artist => artistsNamesArr.push(artist[0].name));
    this.searchForSongs(artistsNamesArr, trackNames);
  };

  indexOfAll = (arr, val) =>
    arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);

  searchForSongs = async (artistsNamesArr, trackNames) => {
    let RKSongTitle = [];
    let publicPlaylistArr = [];
    let iofRKsong = this.indexOfAll(artistsNamesArr, "R. Kelly");


      //checking to see who owns playlist (if public)

    ////////////checking if the playlist is public
    console.log('props',this.props.CurrentUserid,  this.props.playlistInfo.owner.id);
    if (this.props.CurrentUserid !== this.props.playlistInfo.owner.id) {
      console.log('this is the current id', this.props.playlistOwnerId );
    }
    // this.props.CurrentUserid !== this.props.playlistOwnerId
    /////////////

    iofRKsong.forEach(i => RKSongTitle.push(trackNames[i]));

    this.setState({ RKSongTitle, iofRKsong, publicPlaylistArr });

    iofRKsong.forEach(async i => {
      let res = await axios.post("http://localhost:3001/db/songs", {
        name: trackNames[i],
        artist: "R Kelly",
        deleted: false
      });
      this.setState(prevState => ({
        songRouteID: prevState.songRouteID.concat(res.data.data.id)
      }));
    });
  };

  render() {
    const { RKSongTitle, showSongs, items, uri, iofRKsong } = this.state;
    const { playlistInfo } = this.props;
    let buttonText = showSongs ? "CHECK SONGS" : "CLOSE SONGS";
    let songsVisible = showSongs ? "playlist-container-closed" : "playlist-container-open"
    return (
      <div
        className={songsVisible}
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
          <button onClick={e => this.listTracksFromPlaylists(playlistInfo.id)}>
            {buttonText}
          </button>
          {RKSongTitle.length > 0 && (
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
