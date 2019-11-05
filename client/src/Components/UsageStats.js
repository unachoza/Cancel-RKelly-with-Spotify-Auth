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
componentDidMount(){
this.userCounter()
this.songsRemovedCounter()
}
    userCounter = ()=> {
            axios.get('http://localhost:3001/db/users/unique')
            .then(res => {
                console.log('thisvale',res.data.data[0].count)
            this.setState({userCount: res.data.data[0].count})
    
            })
        
        return this.state.userCount
    }

    songsRemovedCounter() {
        axios.get('localhost:3001/db/deletedsongs')
        .then(res => {
            console.log(res)
            // this.setState({deletedSongsCount: res})
        })
        return this.state.deletedSongsCount

    }
    render() {
        const {userCount, deletedSongsCount} = this.state        
        return (
            <div>
               <p>{userCount} People have used this App </p> 
                <p>{deletedSongsCount} Songs have been removed</p>
            </div>
        )
    }

}
export default UsageStats