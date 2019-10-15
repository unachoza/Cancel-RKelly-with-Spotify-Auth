import React, {Component} from 'react'
import '../App.css'
import Spotify from 'spotify-web-api-js'

const   spotifyWebApi = new Spotify()

class FollowPlaylist extends Component{

    createProblemFreePlaylist = () => {
        let trackNames = []
        let artistsNamesArr = []
        let artistObjArr = []
        let uri = []
        const playlistID = '37i9dQZF1DX07vKD9l5Yfi'
        const playlistName = "00 hits"
            spotifyWebApi.getPlaylistTracks(playlistID)
            
            .then((response) => {
            console.log(response)
            response.items.map((item) => {
                trackNames.push(item.track.name)
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
            response.items.map((item) => {
                uri.push(item.track.uri)
            });
          const indexOfAll = (arr, val) => arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), [])
          let RKindexies = indexOfAll(artistsNamesArr, "R. Kelly")
          let CBindexies = indexOfAll(artistsNamesArr, "Chris Brown")
          let MJindexies = indexOfAll(artistsNamesArr, "Michael Jackson")
          const allIndexx =MJindexies.push(RKindexies.push(CBindexies))
          console.log(allIndexx)
          const removedUris = []
          allIndexx.forEach(index => {
             
             uri.splic(index,1)
            })
        
        spotifyWebApi.createPlaylist("1224023576", {"name": `${playlistName} (problem-free!!)`})
            .then(response => {
                const newPlaylistID = response.id
                console.log(newPlaylistID, uri)
             
                 
                  spotifyWebApi.addTracksToPlaylist(newPlaylistID, uri )
               
                console.log(response, " new id",newPlaylistID)
            }
           
        )

        })}


    render(){
        return(
            <div>
                {/* {this.createProblemFreePlaylist()} */}
                {/* <h1>Identify playlist</h1> */}
                {/* <h1>copy songs from playlist in array</h1> */}
                <h1>filter out rkelly, splice</h1>
                {/* <h1>capture playlist name and add "(problem-free)"</h1> */}
                {/* <h1>create new playist with new name</h1> */}
                {/* <h1>add songsArray to created playlist with </h1> */}
                <h2>Add the current user as a follower of Problem-free playlist</h2>
                <h2> Removes the current user as a follower from public playlist</h2>
            </div>
        )
    }
}

export default FollowPlaylist

//get tracks  spotifyWebApi.getPlaylistTracks(playlistID)

// unfollowPlaylist(playlistId: string, callback?: ResultsCallback<SpotifyApi.UnfollowPlaylistReponse>) : Promise<SpotifyApi.UnfollowPlaylistReponse>;

// followPlaylist(playlistId: string, options?: Object, callback?: ResultsCallback<SpotifyApi.FollowPlaylistReponse>) : Promise<SpotifyApi.FollowPlaylistReponse>;

//createPlaylist(userId: string, options?: Object, callback?: ResultsCallback<SpotifyApi.CreatePlaylistResponse>) : Promise<SpotifyApi.CreatePlaylistResponse>;

// addTracksToPlaylist(playlistId: string, uris: string[], options?: Object, callback?: ResultsCallback<SpotifyApi.AddTracksToPlaylistResponse>) : Promise<SpotifyApi.AddTracksToPlaylistResponse>;