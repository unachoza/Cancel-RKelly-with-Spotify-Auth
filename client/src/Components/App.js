import React, { Component } from "react";
import "../App.css";
import Spotify from "spotify-web-api-js";
import PlaylistList from "./PlaylistsList";
import Introduction from "./Introduction";
import Login from './Login'
import UsageStats from "./UsageStats";
import HowItWorks from "./HowItWorks";
import AboutMe from "./AboutMe";
import Nav from "./Nav";
import Home from "./Home";
import MakingHashMap from "./MakingHashMap";
import axios from "axios";

const spotifyWebApi = new Spotify();

class App extends Component {
  constructor(props) {
    super(props);
    const params = this.getHashParams();
    const token = params.access_token;
    this.state = {
      loggedIn: token ? true : false,
      home: true,
      userPlaylists: false,
      howItWorks: false,
      aboutMe: false,
      playListObject: [],
      offsetNum: 0,
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

  //From Spotify Auth
  getUserInfo = async () => {
    let response = await spotifyWebApi.getMe();
    this.setState({
      display_name: response.display_name,
      email: response.email,
      country: response.country,
      id: response.id
    });

    // this.addUser();
  };

  //add User to database
  addUser = () => {
    const time = new Date().toString();
    const { display_name, email, country } = this.state;
    axios.post("http://localhost:3001/db/users", {
      display_name,
      email,
      country,
      time
    });
  };


  





  //getting total number of users playslist to make one 1 array in next function

  getplaylistTotal = async () => {
    const { id } = this.state;
    const res = await spotifyWebApi.getUserPlaylists(id);
    this.setState({ totalPlaylists: res.total });
  };

  //getting list of User's Playlists: limit 50
  getPlaylists = async () => {
    const { id } = this.state;
    this.increaseOffset();
    // {limit: 50, offset: 0} default limit: 20
    const response = await spotifyWebApi.getUserPlaylists(id, {
      offset: this.state.offsetNum
    });
    this.setState({
      playListObject: response.items,
      total: response.total
    });
    this.getAllPlaylists(this.state.totalPlaylists);
  };

  //  using number of total playlists to decided if need for looping to fetch more than 50
  getAllPlaylists = async totalPlaylists => {
    let loopsCount = Math.ceil(totalPlaylists / 20);
    let ALLplaylistID = [];
    let ALLplaylistNameArray = [];
    let offsetNum = -50;
    for (let i = 0; i < loopsCount; i++) {
      offsetNum += 50;
      const res = await spotifyWebApi.getUserPlaylists(this.state.id, {
        limit: 50,
        offset: this.state.offsetNum
      });

      res.items.map(item => ALLplaylistID.push(item.id));
      res.items.map(item => ALLplaylistNameArray.push(item.name));
      return ALLplaylistID;
    }
  };

  increaseOffset = () => {
    this.setState(state => {
      return { offsetNum: state.offsetNum + 20 };
    });
    this.state.total && this.stopClickingNext();
  };

  stopClickingNext = () => {
    let totalClicksLeft = Math.floor(this.state.total / 10) - 1;
    this.setState({ totalClicksLeft });
  };

  //toggling through nav
  navigate = e => {
    let navArr = ["home", "howItWorks", "userPlaylists", "aboutMe"];
    let name = e.target.id;
    this.setState({ [name]: true });
    navArr = navArr.filter(nav => nav !== name);
    navArr.forEach(nav => this.setState({ [nav]: false }));
  };


    // after user logs in they are routed to UserPlaylist Page
  //once you are logged in, user never sees home
  // componentDidUpdate() {
  //   console.log('inside' , this.state.userPlaylists, this.state.loggedIn)
  //   if (this.state.userPlaylists) {
  //     return
  //   } else if (this.state.loggedIn) {
  //     this.setState({
  //       userPlaylists: true,
  //     home: false})
  //   }
  // }

  render() {

   

    console.log(this.state)
    const {
      loggedIn,
      offsetNum,
      total,
      playListObject,
      id,
      home,
      aboutMe,
      howItWorks,
      userPlaylists
    } = this.state;
    return (
      <div className="home">
        <Nav changeNav={this.navigate} />
      

        {loggedIn && !home  && <MakingHashMap />}
        {home && <Home loggedIn={loggedIn} />}
        {!loggedIn && !userPlaylists && <Login loggedIn={loggedIn} userPlaylists={userPlaylists} home={home} route={(e) => this.routeToUserPlaylists(e)}/>}
        {aboutMe && <AboutMe />}
        {howItWorks && <HowItWorks />}

        {/* {userPlaylists && <Introduction loggedIn={loggedIn} />} */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            {userPlaylists && (
              <div>
                {/* WETHER TO SHOW LOGIN BUTTON OR YOUR PLAYLISTS */}
                    {loggedIn && (<div>
                      <button
                      className={offsetNum > 0 ? "hide" : "showIt"}
                      onClick={() => this.getPlaylists()}
                    >
                      Back 10 PLAYLISTS
                    </button>
                    <button
                      className={offsetNum > 0 ? "hide" : "showIt"}
                      onClick={() => this.getPlaylists()}
                    >
                      Next 10 PLAYLISTS
                    </button>
                  </div>)}
                )
              </div>
            )}
          </div>

        <div>
          {/* SHOWING THE NEXT PLAYLISTS */}
          {offsetNum < total && (
            <button
              // NEED TO CHECK THIS -12 SITUATION
              className={offsetNum > total - 12 ? "hide" : "showIt"}
              onClick={() => this.getPlaylists()}
            >
              NEXT 10 PLAYLISTS
            </button>
          )}
        </div>

        {playListObject && (
          <PlaylistList
            usersPlaylists={playListObject}
            CurrentUserid={id}
            home={home}
          />
        )}
        {home && <UsageStats />}
      </div>
    );
  }
}

export default App;
