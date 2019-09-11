import React from 'react'
import '../App.css'

const Introduction = (loggedIn) => {
    // console.log(loggedIn.loggedIn)
    return (
        <div className="Intro-page">
            <h1>Cancel R. Kelly</h1>

            {!loggedIn.loggedIn ?
                <p>This app makes it super simple to get Rkelly out of your ears and life.<br></br> Listening to his music is problematic #BelieveVictims </p> : ""}


            {/* <p>Given the recent climant of believing women, I have built an app that removes problematic songs from Users Spotify Playlists, starting with R. Kelly. I'm choosing to define problematic as Artist who commit domestic abuse and or sexual assault. The purpose of this app is to empower users to painlessly remove R. Kelly's songs from their spotify without having to hunt for where ever they are hidden. Removing problematic music from our lives is just one way we can fight the patriarchy</p> */}
        </div>
    )
}

export default Introduction