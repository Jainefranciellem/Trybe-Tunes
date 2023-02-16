import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import '../css/login.css';
import imgHeader from '../img/logo.png';

export default class Login extends Component {
  saveBtn = async (e) => {
    e.preventDefault();
    const { inputName, stateLoading, history } = this.props;
    stateLoading();
    await createUser({ name: inputName });
    stateLoading();
    history.push('/search');
  };

  render() {
    const { inputName, isDisable, handleChange } = this.props;
    return (
      <div className="container">
        <div className="divForm" data-testid="page-login">
          <img className="logo" src={ imgHeader } alt="" />
          <form className="form" onSubmit={ this.saveBtn }>
            <input
              className="inputName"
              placeholder="qual é seu nome?"
              type="text"
              onChange={ handleChange }
              id="inputName"
              value={ inputName }
              name="inputName"
              data-testid="login-name-input"
            />
            <button
              className="button"
              type="submit"
              data-testid="login-submit-button"
              disabled={ isDisable }
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  isDisabled: PropTypes.bool,
  name: PropTypes.string,
}.isRequired;
