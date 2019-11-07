import React from 'react'
import '../App.css'

const HowItWorks = () => {

    const nextDescription = () => {
        //animation to move text
         
    }

    return (
        <div>
            <button className="right-arrow-description" onClick={nextDescription()}>How It Works</button>
            <p className="paragraph">
                Login with your Spotify credentials. This app will display your playlists and filter through each one to find any problematic / RKelly Songs. 
            </p>
            <p className="paragraph">
                If any are present, you will be given the option to delete it. 
            </p>
            <p className="paragraph">
                If the playlists with the problem is a public song you follow, A new playlist will be made without the song. You will be given the option to unfollow the problematic playlist and follow the problem free playlist. 
            </p >
            <p className="paragraph">
               All songs found are only deleted once you have clicked the delete button. All public playlists are only unfollowed once you've clicked the unfollow button. 
            </p>
            <p className="paragraph">
                Removing his songs; remove his power; create consequence for abuse
            </p>
            <p>
            </p>
        </div>
    )
}

export default HowItWorks