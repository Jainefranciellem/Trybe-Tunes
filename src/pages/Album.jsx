import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import '../css/album.css';

export default class Album extends Component {
  state = {
    name: '',
    album: '',
    musics: [],
    loading: false,
    favoriteMusicId: [],
    image: '',
  };

  componentDidMount() {
    this.getMusicApi();
    this.favoriteSongs();
  }

  favoriteSongs = async () => {
    this.setState({ loading: true });
    const songs = await getFavoriteSongs();
    const favoriteId = songs.map((song) => song.trackId);
    this.setState({
      loading: false,
      favoriteMusicId: favoriteId,
    });
  };

  stateLoading = (favoriteId) => {
    this.setState(({ loading }) => {
      if (loading) {
        return { favoriteMusicId: favoriteId, loading: false };
      }
      return { loading: true };
    });
  };

  getMusicApi = async () => {
    const { match: { params } } = this.props;
    const api = await getMusics(params.id);
    const [, ...apiMusic] = api;
    this.setState({
      name: api[0].artistName,
      album: api[0].collectionName,
      musics: apiMusic,
      image: api[0].artworkUrl100,

    });
  };

  render() {
    const { name, album, musics, loading, favoriteMusicId, image } = this.state;
    return (
      <div>
        <Header />
        { (loading) ? <Loading /> : (
          <div data-testid="page-album">
            <div className="musicFavorites">
              <img src={ image } className="imageAlbum" alt="imagem do album" />
              <div className="nameAndAlbum">
                <h2 className="nameAlbum" data-testid="album-name">{ album }</h2>
                <p className="nameArtist" data-testid="artist-name">{ name }</p>
              </div>
            </div>
            {
              musics.map((music) => (
                <MusicCard
                  key={ music.trackId }
                  music={ music }
                  favoriteMusicId={ favoriteMusicId }
                  favoriteSongs={ this.favoriteSongs }
                  stateLoading={ this.stateLoading }
                />))
            }
          </div>
        )}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;
