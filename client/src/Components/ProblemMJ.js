import React, {Component} from 'react'
import '../App.css'
import Spotify from 'spotify-web-api-js'

const spotifyWebApi = new Spotify()

class ProblemMJ extends Component{


    render() {
              let songs = this.props.mJVerdict.map((song, i) => {
                return <div key={i}>{song} </div> 
             })
        return (
            <div style={{ color: "darkred", fontSize: "20px", fontWeight: "300" }}>
                {songs}
            </div>
        )
    }
}
export default ProblemMJ