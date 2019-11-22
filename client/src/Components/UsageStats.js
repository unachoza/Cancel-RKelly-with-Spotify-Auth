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

   userCounter = async ()=> {
           const res = await axios.get('http://localhost:3001/db/users/unique')
            this.setState({userCount: res.data.data[0].count})
    }

    songsRemovedCounter = async () => {
      const res = await axios.get('http://localhost:3001/db/deletedsongs')
            this.setState({deletedSongsCount: res.data.data[0].count})

    }
    render() {
        const {userCount, deletedSongsCount} = this.state        
        return (
            <div style={{display : "flex", marginTop: 60}}>
                <p className="usage">{userCount} People have used this App<span style={{marginLeft: "35px"}}>{deletedSongsCount} Songs have been removed</span></p>
            </div>
        )
    }

}
export default UsageStats