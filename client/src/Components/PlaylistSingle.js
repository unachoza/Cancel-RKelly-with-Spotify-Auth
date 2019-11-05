import React, {Component} from 'react'
import '../App.css'
import Spotify from 'spotify-web-api-js'
import Songs from './Songs'
import ProblemRK from './ProblemRK'
import ProblemCB from './ProblemCB'
import ProblemMJ from './ProblemMJ'
import UnfollowPlaylist from './UnfollowPlaylist'
import FollowPlaylist from './FollowPlaylist'
import axios from 'axios'

const   spotifyWebApi = new Spotify()

class PlaylistSingle extends Component {
        constructor(props) {
            super(props)
            this.state = {
                showSongs: true,
                items: [],
                trackNames: [],
                artistsNamesArr: [],
                RKSongTitle: [],
                CBSongTitle: [],
                MJsongTitle: [], 
                iofMJsong: [],
                iofRKsong: [],
                iofCBsong: [],
                length: [], 
                uri: [],
                publicPlaylistArr: []
            }
            // this.removeSongs = this.removeSongs.bind(this)
        }
    
    //getting list of tracks in User's Playlists 
    listTracksFromPlaylists(playlistID) {
        this.state.showSongs
      ? this.setState({ showSongs: false })
      : this.setState({ showSongs: true });

        spotifyWebApi.getPlaylistTracks(playlistID)
            .then((response) => {
                console.log(response)
                //saving variables of interested data points in response obj
                let uri = []
                let trackNames = []
                let artistObjArr = []
                let artistsNamesArr = []
                let items = []
               response.items.map((item) => {
                    items.push(item)
                   this.setState({ items })
                   return items
                
                }) 
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
                    return this.setState({uri})
                })
                this.searchForSongs(artistsNamesArr,trackNames)
            })
    }
    indexOfAll = (arr, val) => arr.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), [])

    searchForSongs(artistsNamesArr, trackNames) {
        let RKSongTitle = []
        let CBSongTitle = []
        let MJsongTitle = []
        let publicPlaylistArr = []

        let iofRKsong = this.indexOfAll(artistsNamesArr, "R. Kelly")
        let iofCBsong = this.indexOfAll(artistsNamesArr, "Chris Brown")
        let iofMJsong = this.indexOfAll(artistsNamesArr, "Michael Jackson")
        //checking if the playlist is public
        iofRKsong.map( index => {
            !this.props.CurrentUserid[index] === this.props.playlistOwnerId[index] &&
            publicPlaylistArr.push(index)
            console.log(false)
        })

        console.log(this.props, 'this is props', this.props.CurrentUserid, 'current user id')
        for (let i = 0; i < iofCBsong.length; i++){
            CBSongTitle.push(trackNames[iofCBsong[i]])
        }
        for (let i = 0; i < iofRKsong.length; i++){
            RKSongTitle.push(trackNames[iofRKsong[i]])
        }
        for (let i = 0; i < iofMJsong.length; i++){
            MJsongTitle.push(trackNames[iofMJsong[i]])
        }
        this.setState({ CBSongTitle, RKSongTitle, MJsongTitle , iofMJsong, iofRKsong, iofCBsong, publicPlaylistArr})
        this.problemLength(CBSongTitle, RKSongTitle, MJsongTitle)
        //needs to be somewhere else post only if i of RK has length
        axios.post('http://localhost:3001/db/songs', {
            name: trackNames[iofRKsong],
            artist: 'R Kelly',
            deleted: false
    })
    .then((res) => {
        console.log(res.data.data.id)
        this.setState({
            songRouteID: res.data.data.id
        })

    })
    .then(()=> {
        console.log(this.state)
    })
        
       
    
        // .then(console.log('might have posted'))
    }
    postProblems(){
        const {iofRKsong, trackNames} = this.state
        iofRKsong.length &&
            axios.post('http://localhost:3001/db/songs', {
                name: trackNames[iofRKsong],
                artist: 'R Kelly',
                deleted: false
        })
        .then((res) => {
            // this.setState({
            // songRouteID: res.data.data.

            // })
            console.log(res)
        })
    }

    problemLength(CBSongTitle, RKSongTitle, MJsongTitle) {
        console.log(MJsongTitle, "MJsongTitle is the song" , this.state, "state")
        const length = CBSongTitle.length + RKSongTitle.length + MJsongTitle.length
        this.setState({length})
    }
    render(){
        // this.postProblems()
        const { CBSongTitle, RKSongTitle, MJsongTitle, showSongs, items, length, uri , iofMJsong, iofCBsong, iofRKsong , publicPlaylistArr} = this.state
        const {playlistInfo} = this.props
        let buttonText = showSongs? "CHECK SONGS" : "CLOSE SONGS" 
        return (
        <div className={showSongs ? "playlist-container-closed" : "playlist-container-open"} >
                <img className="album-image" src={playlistInfo.images.length ? playlistInfo.images[0].url : "https://res.cloudinary.com/dh41vh9dx/image/upload/v1568335617/Big_Note-512.png"} alt="album art" />
            <br></br>
            <div className="songs-in-playlist-container-open">
                {playlistInfo.name} <br></br>
                 <button onClick={(e) => this.listTracksFromPlaylists( playlistInfo.id)}>{buttonText}</button>
                    {length > 0 && <div style={{ color: "darkred", fontSize: "20px", fontWeight: "300" }}>This is a problem:</div>}
                {CBSongTitle.length >  0 &&
                    <ProblemCB CBSongTitle={CBSongTitle} iofCBsong={iofCBsong} playlistId={playlistInfo.id} uri={uri} /> }
                    {RKSongTitle.length >  0 &&
                    <ProblemRK songRouteID={this.state.songRouteID} RKSongTitle={RKSongTitle} iofRKsong={iofRKsong} playlistId={playlistInfo.id} uri={uri} publicPlaylistArr={publicPlaylistArr}
                    />}
                {MJsongTitle.length >  0 &&
                    <ProblemMJ MJsongTitle={MJsongTitle} iofMJsong={iofMJsong} playlistId={playlistInfo.id} uri={uri}  /> }
                    {publicPlaylistArr.length && <UnfollowPlaylist publicPlaylistArr={publicPlaylistArr} iofRKsong={iofRKsong} playlistId={playlistInfo.id} uri={uri}/>}
                    {length > 0 && <hr></hr>}
                    {items && <Songs items={items} showSongs={showSongs} />}
                    {/* RKSongTitle={RKSongTitle} iofRKsong={iofRKsong} playlistId={playlistInfo.id} uri={uri} publicPlaylistArr={publicPlaylistArr} */}

            </div>
        </div>
        )
    }
}



  


export default PlaylistSingle

