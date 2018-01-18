import React, { Component } from 'react';
import albumData from './../data/albums';

class Album extends Component {
  constructor(props) {
    super(props);
    const album = albumData.find( album => {
      return album.slug === this.props.match.params.slug
    });
    
    this.state = {
      album: album
    };
  }

  render() {
    let albumInfo = null;
    if (this.state.album) {
      albumInfo = (
        <section id="album-info">
          <img id="album-cover-art" src={this.state.album.albumCover} alt="some pic" />
          <div className="album-details">
            <h1 id="album-title">{this.state.album.title} </h1>
            <h2 className="artist">{this.state.album.artist}</h2>
            <div id="release-info">{this.state.album.releaseInfo}</div>
          </div>
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
