import React, { Component } from "react"

    class SongsToRemove extends Component {

        itsProblematic() {
        const rKellyVerdict = this.props.artistsNamesArr.indexOf("R. Kelly")
        if (5) {
            console.log("Rkelly song here", this.props.trackNames[rKellyVerdict])
        }
        console.log(rKellyVerdict)
        const chrisBrownVerdict = this.props.artistsNamesArr.indexOf("Chris Brown")
        if (chrisBrownVerdict >= 0) {
            console.log("Chris Brown song here", this.props.trackNames[chrisBrownVerdict])
                    

        }
        console.log(chrisBrownVerdict)
    }
        render() {
            console.log(this.props.trackNames)
            return (
            <div>
                    <div>These Songs Suck</div>
                    {this.props.items && this.itsProblematic()}
                <button>Remove them</button>
            </div>
        )
    }
}

export default SongsToRemove