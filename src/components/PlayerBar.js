import React, { Component } from 'react';

class PlayerBar extends Component {
  render() {
    return (
      <section className="player-bar">
        <section id="buttons">
          <button id="previous"  onClick={this.props.handlePrevClick}>
            <span className="ion-ios-skip-backward"></span>
          </button>
          <button id="play-pause" onClick={this.props.handleSongClick} >
            <span className={this.props.isPlaying ? 'ion-ios-pause' : 'ion-ios-play'}></span>
          </button>
          <button id="next">
            <span className="ion-ios-skip-forward"></span>
          </button>
        </section>
        <section id="time-control">
          <div className="current-time">–:––</div>
          <input type="range" className="seek-bar" />
          <div className="total-time">–:––</div>
        </section>
        <section id="volume-control">
          <div className="icon ion-ios-volume-low"></div>
          <input type="range" className="seek-bar"  />
          <div className="icon ion-ios-volume-high"></div>
        </section>
      </section>
    );
  }
}

export default PlayerBar;
