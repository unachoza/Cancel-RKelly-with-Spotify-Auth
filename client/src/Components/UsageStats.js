import React, {Component} from 'react'
import '../App.css'
import axios from 'axios'

class UsageStats extends Component{
    constructor(){
        super()
        this.state ={
            userCount: 0, 
            deletedSongsCount: 0
        }
    }


    // userCounter() {
    //     axios.get('http://localhost:3001/db/users/unique')
    //     .then(res => {
    //     this.setState({userCount: res})
    //     })
    //     return this.state.userCount
    // }

    // songsRemovedCounter() {
    //     axios.get('localhost:3001/db/deletedsongs')
    //     .then(res => {
    //         this.setState({deletedSongsCount: res})
    //     })
    //     return this.state.deletedSongsCount

    // }
    render() {
        return (
            <div>
               <p>{this.userCounter} People have used this App </p> 
                <p>{this.songsRemovedCounter} Songs have been removed</p>
            </div>
        )
    }

}
export default UsageStats