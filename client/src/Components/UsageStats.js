import React, {Component} from 'react'
import '../App.css'

class UsageStats extends Component{

    userCounter() {
        return "Many"
    }
    songsRemovedCounter() {
        return "a lot of"
    }
    render() {
        return (
            <div>
               <p>{this.userCounter()} People have used this App </p> 
                <p>{this.songsRemovedCounter()} Songs have been removed</p>
            </div>
        )
    }

}
export default UsageStats