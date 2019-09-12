import React, {Component} from 'react'
import '../App.css'
import Spotify from 'spotify-web-api-js'

const spotifyWebApi = new Spotify()

class ProblemRK extends Component{
  
    render() {
           let songs = this.props.rKellyVerdict.map((song, i) => {
          return <div key={i}>This is a problem: {song} </div> 
     })
        return (
            <div style={{ color: "darkred", fontSize: "20px", fontWeight: "300" }}>
                  <hr></hr>
                {songs}
                <hr></hr>

            </div>
        )
    }
}




export default ProblemRK