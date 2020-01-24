import React from 'react'
import Spotify from 'spotify-web-api-js';
const spotifyWebApi = new Spotify();

export class SpotifyApi {
  async getUserInformationFromLogin() {
    const response = await spotifyWebApi.getMe();

    return {
      userId: response.id,
      name: response.display_name,
      email: response.email,
      country: response.country,
    };
  }

  async getPlaylistsCountByUserId(userId) {
    return await spotifyWebApi.getUserPlaylists(userId);
  }

  async getProblemsMap() {
    const userInformation = await this.getUserInformationFromLogin();
    const playlistCount = await this.getPlaylistsCountByUserId(userInformation.userId)

    // return problemsMap
  }

}

// API calls to Spotify
/*
setAccessToken
getMe
getUserPlaylist(userId)
getPlaylist
getPlaylistTracks
removeTracksFromPlaylist
createNewPlaylist
addTracksToPlaylist
unfollowPlaylist
*/

/****** ALL FUNCTIONALITY ******
 * 
 * get user info
 * get playlist total 
 * get list of playlists from user id 
 * get list of songs and aritist from each playlist
 * filter playlists for problems (sourcePlaylist, keyword)
 * display playlist name with problem 
 * display individual problem track with remove button
 * remove song from playlist
 * refresh page
 * 
 * if playlist is public playlist
 * create new playlist name with id
 * get tracks from source playlist
 * filter source playlist removing problems to create a new list of tracks 
 * add tracks to newly created playlist
 * unfollow public playlist 
 * refresh page
 * 
 * 
 */