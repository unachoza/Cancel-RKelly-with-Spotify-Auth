import React, { Component } from "react";
import "../App.css";
import Spotify from "spotify-web-api-js";
import PlaylistList from "./PlaylistsList";
import Introduction from "./Introduction";
import UsageStats from "./UsageStats";
import HowItWorks from "./HowItWorks";
import AboutMe from "./AboutMe";
import Nav from "./Nav";
import Home from "./Home";
import axios from "axios";

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor() {
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    this.state = {
      loggedIn: token ? true : false,
        home: true,
        login: false,
        HowItWorks: false,
        aboutMe: false,
      playListObject: "",
      trackNamesArr: [],
      offsetNum: 0,
      items: [],
      display_name: "",
      email: "",
      country: "",
      id: ""
    };

    if (token) {
      spotifyWebApi.setAccessToken(token);
      this.getUserInfo();
    }
  }

  getHashParams() {
    let hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
  logout() {
    console.log("clicked logout");
    window.location.reload();
  }
  //From Spotify Auth
  getUserInfo() {
    spotifyWebApi
      .getMe()
      .then(response => {
        console.log(response);
        this.setState({
          display_name: response.display_name,
          email: response.email,
          country: response.country,
          id: response.id
        });
      })
      .then(console.log("state", this.state))

      .then(() => {
        this.addUser();
        console.log("added");
      });
  }

  //add User to database
  addUser = () => {
    const time = new Date().toString();
    console.log(time);
    const { display_name, email, country } = this.state;
    if (display_name) {
      axios
        .post("http://localhost:3001/db/users", {
          display_name,
          email,
          country,
          time
        })
        .then(data => {
          console.log("success", data);
        });
    }
  };
  //getting total number of users playslist to make one 1 array in next function
  getplaylistTotal = () => {
    const { totalPlaylists } = this.state;
    spotifyWebApi.getUserPlaylists(this.state.id).then(res => {
      console.log(res);
      this.setState({ totalPlaylists: res.total });
    });
    console.log(totalPlaylists);
    return totalPlaylists;
  };

  //getting list of User's Playlists: limit 50
  getPlaylists = () => {
    console.log(this.state);

    let playlistOwnerId = [];
    this.setState({ items: [], playListObject: [] });
    this.increaseOffset();
    // {limit: 50, offset: 0} default limit: 20
    console.log("ofset inside func", this.state.id);
    spotifyWebApi
      .getUserPlaylists(this.state.id, { offset: this.state.offsetNum })
      .then(response => {
        console.log(response);
        this.setState({
          playListObject: response.items,
          total: response.total
        });
      })
      .then(() => {
        const num = this.getplaylistTotal();
        console.log(num);
        this.getAllPlaylists(num);
      })
      .then(() => {
        this.state.playListObject.map(item => {
          playlistOwnerId.push(item.owner.id);
        });
        return playlistOwnerId;
      })
      .then(() => {
        this.setState({ playlistOwnerId });
      })
      .then(() => {
        console.log(this.state.playlistOwnerId);
      });
  };
  getAllPlaylists(totalPlaylists) {
    // const {totalPlaylists} = this.state
    let loopsCount = Math.ceil(totalPlaylists / 50);
    console.log(loopsCount);
    let offsetNum = -50;
    let ALLplaylistID = [];
    let ALLplaylistNameArray = [];
    for (let i = 0; i < loopsCount; i++) {
      offsetNum += 50;
      spotifyWebApi
        .getUserPlaylists(this.state.id, {
          limit: 50,
          offset: offsetNum
        })
        .then(res => {
          console.log(res);
          res.items.map(item => {
            ALLplaylistID.push(item.id);
          });
          res.items.map(item => {
            ALLplaylistNameArray.push(item.name);
          });
          console.log(ALLplaylistID, ALLplaylistNameArray);
          return ALLplaylistID;
        })
        .then(() => {});
      // .then((res) => {
      //     let itemsaa = 0
      //     res.items.map((item) => {
      //         itemsaa.push(item)
      //        return items

      //     })
      //     console.log(res)
      //     res.items.map((item) => {
      //         ALLplaylistIdArray.push(item.id)
      //         ALLplaylistNameArray.push(item.name)
      //     console.log('playlistidarr', ALLplaylistIdArray, 'playlistnamearr', ALLplaylistNameArray)

      //         return (ALLplaylistIdArray, ALLplaylistNameArray)
      //     })
      //     .then(() => {
      //         this.listTracksFromPlaylists(ALLplaylistIdArray, ALLplaylistNameArray)
      //     })
      // })
    }
  }

  listTracksFromPlaylists(playlistIDArr, playlistNameArr) {
    spotifyWebApi.getPlaylistTracks(playlistIDArr).then(res => {
      let items = res.items;
      console.log(res);
      //saving variables of interested data points in response obj
      let trackNames = [];
      let artistsNamesArr = [];
      items.map(item => {
        trackNames.push(item.track.name);
        return trackNames;
      });
      this.searchForSongs(artistsNamesArr, trackNames);
    });
  }
  indexOfAll = (arr, val) =>
    arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), []);

  searchForSongs(artistsNamesArr, trackNames) {
    let iofRKsong = this.indexOfAll(artistsNamesArr, "R. Kelly");

    //checking if the playlist is public
    console.log("this is idexs of playslist with problems", iofRKsong);

    // console.log(this.props, 'this is props', this.props.CurrentUserid, 'current user id')
    // for (let i = 0; i < iofCBsong.length; i++){
    //     CBSongTitle.push(trackNames[iofCBsong[i]])
    // }
    // for (let i = 0; i < iofRKsong.length; i++){
    //     RKSongTitle.push(trackNames[iofRKsong[i]])
    // }
    // for (let i = 0; i < iofMJsong.length; i++){
    //     MJsongTitle.push(trackNames[iofMJsong[i]])
    // }
    // this.setState({ CBSongTitle, RKSongTitle, MJsongTitle , iofMJsong, iofRKsong, iofCBsong, publicPlaylistArr})
    // this.problemLength(CBSongTitle, RKSongTitle, MJsongTitle)
  }

  increaseOffset() {
    console.log("offset num ", this.state);
    this.setState(state => {
      return { offsetNum: state.offsetNum + 20 };
    });
    if (this.state.total) {
      this.stopClickingNext();
    }
  }

  stopClickingNext() {
    let totalClicksLeft = Math.floor(this.state.total / 10) - 1;
    this.setState({ totalClicksLeft });
  }

  findRKelly() {
    // rkelly id : "2mxe0TnaNL039ysAj51xPQ"
    spotifyWebApi.search("r kelly", ["artist"]).then(response => {
      console.log("this is the response ", response);
    });
  }

  //Search ALL Playlist for Problems; Diplay Playlist Names with Problems
  searchAllPlaylists(artistsNamesArr, trackNames) {
    let RKSongTitle = [];
    let iofRKsong = this.indexOfAll(artistsNamesArr, "R. Kelly");
    for (let i = 0; i < iofRKsong.length; i++) {
      RKSongTitle.push(trackNames[iofRKsong[i]]);
    }

    this.setState({ RKSongTitle, iofRKsong });
  }
  navigate = (e) => {
    let navArr = ["home", "howItWorks", "login", "aboutMe"]
    let name = e.target.id
    this.setState({
      [name]: true
    })
    navArr =  navArr.filter(nav => nav !== name )
    navArr.forEach((nav) => {
      this.setState({
        [nav]: false
      })
    })
    
  }
   

  render() {
    const { loggedIn, offsetNum, total, playListObject, items,  trackNamesArr, playlistOwnerId, id, home, aboutMe, HowItWorks, login } = this.state;
    return (
      <div className="home">
        <Nav changeNav={this.navigate} navState={this.state}/>
        <h1>Cancel R. Kelly</h1>
        {home && <Home />}
        <br></br>
        {aboutMe && <AboutMe />}

        <div className={loggedIn ? "loggedIn" : "loggedOut"}>
          {HowItWorks && <Introduction loggedIn={loggedIn} />}

          <div style={{ margin: "0px" }}>
            <div></div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              {login && (
                <div>
                  {!loggedIn ? (
                    <a href="http://localhost:8888">
                      {/* <button>How it works</button> */}
                      <button>Login to Spotify</button>
                    </a>
                  ) : (
                    <div>
                      <button
                        className={offsetNum > 0 ? "hide" : "showIt"}
                        onClick={() => this.getPlaylists()}
                      >
                        YOUR PLAYLISTS
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div>
            {offsetNum < total ? (
              <button
                className={offsetNum > total - 12 ? "hide" : "showIt"}
                onClick={() => this.getPlaylists()}
              >
                NEXT 10 PLAYLISTS
              </button>
            ) : (
              " "
            )}
          </div>
        </div>

        {playListObject && trackNamesArr && (
          <PlaylistList
            usersPlaylists={playListObject}
            playlistOwnerId={playlistOwnerId}
            items={items}
            CurrentUserid={id}
          />
        )}
        {home && <UsageStats />}
        {/* {this.listTracksFromPlaylists("1ZmR4C1R0clb32v25PWzvD")} */}
      </div>
    );
  }
}

export default App;
