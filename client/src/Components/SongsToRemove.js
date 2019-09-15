import React, { Component } from "react"

    class SongsToRemove extends Component {

        itsProblematic() {
            const {artistsNamesArr, trackNames} = this.props
        const rKellyVerdict = artistsNamesArr.indexOf("R. Kelly")
        if (5) {
            console.log("Rkelly song here", trackNames[rKellyVerdict])
        }
        console.log(rKellyVerdict)
        const chrisBrownVerdict = artistsNamesArr.indexOf("Chris Brown")
        if (chrisBrownVerdict >= 0) {
            console.log("Chris Brown song here", trackNames[chrisBrownVerdict])
                    

        }
        console.log(chrisBrownVerdict)
    }
        render() {
            const {trackNames, items} = this.props 
            console.log(trackNames)
            return (
            <div>
                    <div>These Songs Suck</div>
                    {items && this.itsProblematic()}
                <button>Remove them</button>
            </div>
        )
    }
}

export default SongsToRemove