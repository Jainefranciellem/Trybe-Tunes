import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import '../css/header.css';
import imgHeader from '../img/logo.png';
import search from '../img/Vector (1).png';
import star from '../img/Vector (2).png';
import userIcon from '../img/🦆 icon _profile_.png';
import userImg from '../img/eu.png';

export default class Header extends Component {
  state = {
    userName: '',
  };

  componentDidMount() {
    this.showUser();
  }

  showUser = async () => {
    const user = await getUser();
    this.setState({
      userName: user.name,
    });
  };

  render() {
    const { userName } = this.state;
    return (
      <div>
        <header className="containerHeader" data-testid="header-component">
          <img className="logo" src={ imgHeader } alt="" />
          <span className="name" data-testid="header-user-name">{userName}</span>
          <img className="image" src={ userImg } alt="" />
          <ul className="ulLinks">
            <img className="searchIcon" src={ search } alt="" />
            <li className="search">
              <Link to="/search" data-testid="link-to-search">search</Link>
            </li>
            <img className="userIcon" src={ userIcon } alt="" />
            <li className="profile">
              <Link to="/profile" data-testid="link-to-profile">profile</Link>
            </li>
            <img className="star" src={ star } alt="" />
            <li className="favorite">
              <Link to="/favorites" data-testid="link-to-favorites">favorite</Link>
            </li>
          </ul>
        </header>
      </div>
    );
  }
}
