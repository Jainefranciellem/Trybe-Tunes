import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../components/Loading';
import '../css/search.css';

export default class Search extends Component {
  state = {
    isDisable: true,
    inputName: '',
    arrayAlbuns: [],
    loading: false,
    albumFound: '',
    albumNotFound: '',
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.enableButton());
  };

  enableButton = () => {
    const { inputName } = this.state;
    const maxNum = 2;
    if (inputName.length >= maxNum) {
      this.setState({
        isDisable: false,
      });
    } else {
      this.setState({
        isDisable: true,
      });
    }
  };

  clearInput = async () => {
    const { inputName } = this.state;
    this.setState({
      loading: true,
    });
    const albumApi = await searchAlbumsAPI(inputName);
    this.setState({
      arrayAlbuns: albumApi,
      inputName: '',
      loading: false,
      albumFound: `Resultado de álbuns de: ${inputName}`,
      albumNotFound: 'Nenhum álbum foi encontrado',
    });
  };

  render() {
    const { inputName,
      isDisable,
      arrayAlbuns,
      loading,
      albumFound,
      albumNotFound,
    } = this.state;
    return (
      (loading) ? <Loading /> : (
        <div className="divPai">
          <Header />
          <div className="containerSearch" data-testid="page-search">
            <input
              className="inputName2"
              placeholder="digite sua pesquisa"
              type="text"
              data-testid="search-artist-input"
              name="inputName"
              value={ inputName }
              onChange={ this.handleChange }
            />
            <button
              className="button2"
              type="submit"
              data-testid="search-artist-button"
              disabled={ isDisable }
              onClick={ this.clearInput }
            >
              Pesquisar
            </button>
          </div>
          <div className="h3result">
            <h2 className="albumFound">
              {arrayAlbuns.length === 0 ? albumNotFound : albumFound}
            </h2>
            <ul className="ulcontainer">
              {arrayAlbuns
                .map(({ artworkUrl100, collectionName, artistName, collectionId }) => (
                  <li key={ collectionId }>
                    <Link
                      data-testid={ `link-to-album-${collectionId}` }
                      to={ `/album/${collectionId}` }
                    >
                      <img
                        className="imgAlbum"
                        src={ artworkUrl100 }
                        alt="imagem do albuns"
                      />
                      <h3 className="h3Album">{collectionName}</h3>
                      <p className="pAlbum">{artistName}</p>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )
    );
  }
}
