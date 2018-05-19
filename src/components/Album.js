import React, { Component } from 'react';
import albumData from './../data/albums';

class Album extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      album: null,
      currentSong: null,
      isPlaying: false
    };
    this.audioElement = document.createElement('audio');
  }

  componentDidMount() {
    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug;
    });

    console.log(album)
    if(album) {
      this.setState({
        album: album,
        currentSong: album.songs[0]
      });

      this.audioElement.src = album.songs[0].audioSrc;
    }
  }

  play() {
    this.audioElement.play();
    this.setState({ isPlaying: true });
  }

  pause() {
    this.audioElement.pause();
    this.setState({ isPlaying: false });
  }

  setSong(song) {
    this.audioElement.src = song.audioSrc;
    this.setState({ currentSong: song });
  }

  handleSongClick(song) {
    const isSameSong = this.state.currentSong === song;
    if (this.state.isPlaying && isSameSong) {
      this.pause();
    } else {
      if (!isSameSong) { this.setSong(song); }
      this.play();
    }
  }

  render() {
    let albumInfo = null;
    if (this.state.album) {
      albumInfo = (
        <section className="album">
          <section id="album-info">
            <img id="album-cover-art" src={this.state.album.albumCover} alt="some pic" />
            <div className="album-details">
              <h1 id="album-title">{this.state.album.title} </h1>
              <h2 className="artist">{this.state.album.artist}</h2>
              <div id="release-info">{this.state.album.releaseInfo}</div>
            </div>
          </section>
          <table id="song-list">
            <colgroup>
              <col id="song-number-column" />
              <col id="song-list" />
              <col id="song-title-column" />
              <col id="song-duration-column" />
            </colgroup>
            <tbody>
              {
                this.state.album.songs.map( (song, index) =>
                  <tr className="song" key={index} onClick={() => this.handleSongClick(song)} >
                    <td className="song-actions">
                      <button>
                        <span className="song-number">{index + 1}</span>
                        <span className="ion-play"></span>
                        <span className="ion-pause"></span>
                      </button>
                    </td>
                    <td className="song-title">{song.title}</td>
                    <td className="song-duration">{song.duration}</td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </section>
      );
    }

    return (
      <section className="album">
        {albumInfo}
      </section>
    );
  }
}
export default Album;
