import React from 'react'
import AboutMe from './AboutMe'
import '../App.css'

const Introduction = (loggedIn) => {
    return (
        <div className="Intro-page">
            {/* <h1 style={{width: "65%"}}>Cancel R. Kelly</h1> */}
            {loggedIn &&
            <div>
                <p style={{marginBottom: "40px"}}>This app effortlessly removes R Kelly from our lives. Listening to his music is problematic #BelieveWomen</p>
                <p style={{marginBottom: "40px"}}>Given the recent climant of believing women, I have built an app that removes problematic songs from users Spotify Playlists, starting with R. Kelly. I'm defining problematic as an artist who has committed domestic abuse and or sexual assault against others. This app empowers users to painlessly remove R. Kelly's songs without hunting through their playlists. Removing problematic music from our lives is just one way we can fight the patriarchy</p>
            </div>}
        </div>
    )
}

export default Introduction


//table of user names 
//table of removed songs instances
//how many times has a user interacted before remove
//how many quit; when did they quit
//conversion 