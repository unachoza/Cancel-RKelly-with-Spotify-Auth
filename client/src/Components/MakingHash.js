import React, { Component } from "react";
// import "./App.css";
import Spotify from "spotify-web-api-js";
const spotifyWebApi = new Spotify();

class MakingHash extends Component {
  state = {
    playlists: []
  };

    async componentDidMount() {
        // const {user} = this.state
        spotifyWebApi.getMe();
        const userRes = await spotifyWebApi.getMe();
        console.log(userRes);
        this.setState({
            id: userRes.id,
            name: userRes.display_name,
            email: userRes.email,
            country: userRes.country,
            totalPlaylists: userRes.total
        });
        console.log("this is stateu", this.state);
        let offsetNum = -50;
        let playlistResults = [];
        let playlistPartialResults = [];
        //geting playlists ids & names only 20
        const loops = await spotifyWebApi.getUserPlaylists(this.state.id);
        this.setState({ totalPlaylists: loops.total });
        let loopsCount = Math.ceil(this.state.totalPlaylists / 50);
        for (let i = 0; i < loopsCount; i++) {
            offsetNum += 50;
            const temp = await spotifyWebApi.getUserPlaylists(this.state.id, { limit: 50, offset: offsetNum })
            playlistResults.push.apply(playlistResults, temp.items)
            console.log("I have the state", this.state, "other long everythign", playlistResults)
            let playlistIds = []
            let playlistNames = []
            playlistResults.map((index) => {
                playlistIds.push(index.id)
                playlistNames.push(index.name)
            })
            this.setState(prevState => ({
                playlists: {
                    ...prevState.playlists,
                    playlistIds: [...playlistIds, playlistIds],
                    playlistNames: [...playlistNames, playlistNames]
             }
            }))
            console.log('my state', this.state)
        }
    }








            // console.log('get em ', playlistIds)
            // let one = Object.keys(playlistResults[0])
            // console.log(Object.entries(one))
            //   let filtered = (Object.entries(one).filter( only => 
            //         only[1] === "name"
            //   ))
            //     console.log(filtered)
            // }
        //    theMost= playlistResults.concat(playlistPartialResults)
        //     console.log(theMost)
        
            //     console.log(theTotal.concat(temp))
            // }
            // })

            //            playlistPartialResults.items.map((one) => {
            //                console.log(one)
            //            })

            //            let temp = playlistPartialResults.items
            //            console.log(temp, playlistResults)
            //    let  concated =  playlistResults.concat(temp)
            //        console.log(concated)

            //   
            //    let playlistNames = []
            //    playlistResults.items.map((item) => {
            //        playlistIds.push(item.id)
            //        playlistNames.push(item.name)
            //    })
               

            //

            //    console.log('this is state now', this.state)
        
    

  render() {
    return <div>hash</div>;
  }
}

export default MakingHash;
