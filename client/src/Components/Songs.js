import React, {Component}from 'react'
import '../App.css'
import Spotify from 'spotify-web-api-js'
import SongSingle from './SongSingle'

const spotifyWebApi = new Spotify()

class Songs extends Component {
        listTracksFromPlaylists(trackID){
        console.log('checking Songs in playlist')
        spotifyWebApi.getPlaylistTracks(trackID)
            .then((response) => {
                // console.log(response)
                //saving variables of interested data points in response obj
                let trackNames = []
                let artistObjArr = []
                let artistsNamesArr = []

                response.items.map((item) => {
                    trackNames.push(item.track.name)
                    this.setState({
                        artistsNamesArr: trackNames
                    })
                    return trackNames
                })
                response.items.map(item => {
                    artistObjArr.push(item.track.artists)
                    return artistObjArr
                })
                artistObjArr.map((artist) => {
                    artistsNamesArr.push(artist[0].name)
                    return artistsNamesArr
                })
                const rKellyVerdict = artistsNamesArr.indexOf("R. Kelly")
                if (rKellyVerdict >= 0) {
                    console.log("Rkelly song here", trackNames[rKellyVerdict])
                    return rKellyVerdict
                }
                const chrisBrownVerdict = artistsNamesArr.indexOf("Chris Brown")
                if (chrisBrownVerdict >= 0) {
                    console.log("Chris Brown song here", trackNames[chrisBrownVerdict])
                    return chrisBrownVerdict
                }
           
            })
    }

        render() {
                console.log("Hit songs component", this.trackNames )

        
        
                return (
                        <div>
  {this.props.trackNames.map((name, i) => 
            <SongSingle name={name} key={i}/>
            )}
                        </div>
                )
        }
}
 
//      const theseSongs = trackNames.map(name => <div>{name}</div>)

//     return (
//               <div> hey
            {/* {trackNames.map((name, i) => 
            <SongSingle name={name} key={i}/>
            )} */}

//     </div>   
//             )
    



export default Songs