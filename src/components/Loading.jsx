import React, { Component } from 'react';
import '../css/loading.css';
import carregando from '../img/Vector (3).svg';

export default class Loading extends Component {
  render() {
    return (
      <div className="loading">
        <img className="imagemAnimation" src={ carregando } alt="" />
        Carregando...
      </div>
    );
  }
}
