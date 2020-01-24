import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "../App.css";


const Introduction = loggedIn => {
  return (
    <div className="Intro-page">
      <Carousel showThumbs={false} showStatus={false}>
         
          <div className="carousel-divs">
            <p className="paragraph">
              Given the recent climant of believing women, I have built an app that removes problematic songs from users Spotify Playlists, starting with R. Kelly. 
              </p>
          </div>        
                      
              <div className="carousel-divs">
            <p className="paragraph">
                      I'm defining problematic as an artist who has committed domestic abuse and or sexual assault against others.
                      </p>
          </div>  


          <div className="carousel-divs">
            <p className="paragraph">
                       This app empowers users to painlessly remove R. Kelly's songs without hunting through their playlists.
                       </p>
          </div>  

          <div className="carousel-divs">
            <p className="paragraph">
                        Removing problematic music from our lives is just one way we can fight the patriarchy
            </p>
          </div>
        
      </Carousel>
    </div>
  );
};

export default Introduction;

//table of user names
//table of removed songs instances
//how many times has a user interacted before remove
//how many quit; when did they quit
//conversion
