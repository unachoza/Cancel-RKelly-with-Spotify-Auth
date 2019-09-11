import React, {Component} from 'react'
import '../App.css'

class ProblematicSongs extends Component{
    render() {

        return (

            <div style={{color: "darkred", fontSize: "20px", fontWeight: "300"}}>
              <div>is a problem : {this.props.chrisBrownVerdict}</div> 
            <div>This is a problem : {this.props.rKellyVerdict}</div> 


            </div>
        )
    }
}




export default ProblematicSongs