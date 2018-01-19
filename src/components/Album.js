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
                      <span class="song-number">{index + 1}</span>
                      <span class="ion-play"></span>
                      <span class="ion-pause"></span>
                    </button>
                  </td>
                  <td className="song-title">{song.title}</td>
                  <td className="song-duration">{song.duration}</td>
                </tr>
              )}
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
