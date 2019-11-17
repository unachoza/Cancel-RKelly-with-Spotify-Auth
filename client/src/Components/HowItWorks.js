
import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import '../App.css'

const HowItWorks = () => {

    return (
        <div>
        <Carousel showThumbs={false} showStatus={false}>
          <div className="carousel-divs">
            <p className="paragraph">
              Login with your Spotify credentials. This app will display your
              playlists and filter through each one to find any problematic /
              RKelly Songs.
            </p>
          </div>
          <div className="carousel-divs">
            <p className="paragraph">
              If any songs are present, you will be given the option to delete it.
            </p>
          </div>
          <div className="carousel-divs">
            <p className="paragraph">
              If the playlists with the problem is a public playlists, A new
              playlist will be made without the song. You will be given the option to unfollow the problematic playlist and follow the problem free playlist.
            </p>
          </div>
          <div className="carousel-divs">
            <p className="paragraph">
              All songs found are only deleted once you have clicked the delete button. All public playlists are only unfollowed once you've clicked the unfollow button.
            </p>
          </div>
          <div className="carousel-divs">
            <p className="paragraph">
              Removing his songs; Remove his power; Rreate consequence for abuse
            </p>
          </div>
        </Carousel>
        <p></p>
      </div>
    )
}


export default HowItWorks;
