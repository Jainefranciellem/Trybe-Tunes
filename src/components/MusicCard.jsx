import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    loading: false,
    favorite: false,
  };

  async componentDidMount() {
    this.setState({
      favorite: await this.getSongs(),
    });
  }

  favoriteSongs = async ({ target }) => {
    const { music } = this.props;
    this.setState({ loading: true });

    if (target.checked) {
      await addSong(music);
    } else {
      await removeSong(music);
    }
    this.setState({
      loading: false,
      favorite: target.checked,
    });
  };

  getSongs = async () => {
    const { music: { trackId } } = this.props;
    const songs = await getFavoriteSongs();
    return songs.map((song) => song.trackId).includes(trackId);
  };

  render() {
    const { music: { trackName, previewUrl, trackId }, updateFavoriteSongs } = this.props;
    const { favorite, loading } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <>
        <div className="divPaiSongs">
          <h3 className="nameTrack">{trackName}</h3>
          <audio
            className="audioTrack"
            data-testid="audio-component"
            src={ previewUrl }
            controls
          >
            <track kind="captions" />
            O seu navegador não suporta o elemento
            <code>audio</code>
          </audio>
          <label className="checkbox" htmlFor="checkbox">
            <input
              type="checkbox"
              id="checkbox"
              name="favoriteSongs"
              data-testid={ `checkbox-music-${trackId}` }
              onChange={ this.favoriteSongs }
              checked={ favorite }
              onClick={ updateFavoriteSongs }
            />
          </label>
        </div>
        <div className="tracinho" />
      </>
    );
  }
}

MusicCard.propTypes = {
  previewUrl: PropTypes.string,
  trackName: PropTypes.string,
}.isRequired;

export default MusicCard;
