import React, { Component } from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import '../css/favorite.css';

export default class Favorites extends Component {
  state = {
    loading: false,
    musics: [],
  };

  async componentDidMount() {
    this.setState({
      loading: true,
    });
    const songs = await getFavoriteSongs();
    this.setState({
      loading: false,
      musics: songs,
    });
  }

  updateFavoriteSongs = async (music) => {
    this.setState({ loading: true });
    await removeSong(music);
    const songs = await getFavoriteSongs();
    this.setState({
      loading: false,
      musics: songs,
    });
  };

  render() {
    const { loading, musics } = this.state;
    if (loading) {
      return <Loading />;
    }
    return (
      <div>
        <Header />
        <h1 className="header">Musicas favoritas</h1>
        <div className="favoriteMusic" data-testid="page-favorites">

          {
            musics.map((music) => (
              <MusicCard
                key={ music.trackId }
                music={ music }
                updateFavoriteSongs={ () => this.updateFavoriteSongs(music) }
              />))
          }
        </div>
      </div>
    );
  }
}
