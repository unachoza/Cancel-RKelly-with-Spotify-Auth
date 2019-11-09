import React from 'react'
import "../App.css"

const AboutMe = () => {
    return (
        <div className="profile-container">
            <img  className="profile" src="https://scontent.fewr1-5.fna.fbcdn.net/v/t1.0-9/75271448_10219372809804813_5965959957852454912_n.jpg?_nc_cat=105&_nc_oc=AQkRtf6zIxiJnA6gz1A-uA0m270HFgjyPh8N9HWzZkZm3oVlALBaI0A3y7jmVoR6pkQ&_nc_ht=scontent.fewr1-5.fna&oh=dca570a8e26443cb901f55d59a0c188e&oe=5E4466C4" alt="img of app creator"/>
            <div className="bio" >
            <p >
               <span style={{fontSize: "20px"}}>Built by </span> Arianna Choza, <br></br>
               <span style={{fontSize: "20px"}}>a FullStack Engineer driven to design a world that promotes equality, creating products that re-image existing conditions, pushing the future forward by building products that inform users of their potential and empower them to realize it. </span>
            </p>
            
                <a href="www.linkedIn.com/in/arianna-choza">Find me on LinkedIn</a>
                <a href="www.arianna-choza.surge.sh">Other Projects</a>
                <a href="unachoza@gmail.com">Contact Me</a>
            </div>
            
        </div>
    )
}
export default AboutMe