import React, { Component } from 'react';
import albumData from './../data/albums';
import PlayerBar from './PlayerBar';

class Album extends Component {
  constructor(props) {
    super(props);

    this.state = {
      album: null,
      currentSong: null,
      isPlaying: false,
      isHovering: false,
      currentTime: 0,
      duration: 0,
      currentVolume: 0
    };
    this.audioElement = document.createElement('audio');
  }

  componentDidMount() {
    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug;
    });

    if(album) {
      this.setState({
        album: album,
        currentSong: album.songs[0],
        currentTime: 0,
        duration: album.songs[0].duration,
        currentVolume: 0
      });

      this.audioElement.src = album.songs[0].audioSrc;
    }
    this.eventListeners = {
      timeupdate: e => {
        this.setState({ currentTime: this.audioElement.currentTime });
      },
      durationchange: e => {
        this.setState({ duration: this.audioElement.duration });
      },
      volumeupdate: e => {
        this.setState({ currentVolume: this.audioElement.volume });
      }
    };
    this.audioElement.addEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.addEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.addEventListener('volumeupdate', this.eventListeners.volumeupdate);
  }

  componentWillUnmount() {
    this.audioElement.src = null;
    this.audioElement.removeEventListener('timeupdate', this.eventListeners.timeupdate);
    this.audioElement.removeEventListener('durationchange', this.eventListeners.durationchange);
    this.audioElement.removeEventListener('volumeupdate', this.eventListeners.volumeupdate);
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

  handlePrevClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.max(0, currentIndex - 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleNextClick() {
    const currentIndex = this.state.album.songs.findIndex(song => this.state.currentSong === song);
    const newIndex = Math.min(this.state.album.songs.length, currentIndex + 1);
    const newSong = this.state.album.songs[newIndex];
    this.setSong(newSong);
    this.play();
  }

  handleTimeChange(e) {
    const newTime = this.audioElement.duration * e.target.value;
    this.audioElement.currentTime = newTime;
    this.setState({ currentTime: newTime });
  }

  handleVolumeChange(e) {
    const newVolume = e.target.value;
    this.audioElement.currentVolume = newVolume;
    this.setState({ currentVolume: newVolume });
  }

  formatTime(time) {
    return time ? `${Math.floor(time / 60)}:${Number(time % 60 / 100).toFixed(2).substr(2,3)}` : '-:--'
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
                  <tr className="song" key={index} onClick={() => this.handleSongClick(song)} onMouseEnter={ () => this.setState({isHovering: index})} onMouseLeave={ () => this.setState({isHovering: false})} >
                    <td className="song-actions">
                      { (this.state.currentSong.title === song.title) ?
                          <span className={ this.state.isPlaying ? "ion-ios-pause" : "ion-ios-play" }></span>
                          :
                          (this.state.isHovered === index+1) ?
                          <span className="ion-ios-play"></span>
                          :
                          <span className="song-number">{index+1}</span>
                      }
                    </td>
                    <td className="song-title">{song.title}</td>
                    <td className="song-duration">{ this.formatTime(song.duration) }</td>
                  </tr>
                )
              }
            </tbody>
          </table>
          <PlayerBar
            isPlaying={this.state.isPlaying}
            currentSong={this.state.currentSong}
            currentTime={this.state.currentTime}
            currentVolume={this.state.currentVolume}
            duration={this.state.duration}
            formatTime={(t) => this.formatTime(t)}
            handleSongClick={() => this.handleSongClick(this.state.currentSong)}
            handlePrevClick={() => this.handlePrevClick()}
            handleNextClick={() => this.handleNextClick()}
            handleTimeChange={(e) => this.handleTimeChange(e)}
            handleVolumeChange={(e) => this.handleVolumeChange(e)}
          />
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
