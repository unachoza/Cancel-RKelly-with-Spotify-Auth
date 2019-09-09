import React, { Componenet } from "react"
import Spotify from 'spotify-web-api-js'


class SongsToRemove extends Componenet{
    render() {
        return (
            <div>
                <div>These Songs Suck</div>
                <button>Remove them</button>
            </div>
        )
    }
}

export default SongsToRemove