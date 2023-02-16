import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser, updateUser } from '../services/userAPI';
import '../css/profileEdit.css';

export default class ProfileEdit extends Component {
  state = {
    name: '',
    description: '',
    image: '',
    email: '',
    loading: false,
    validation: true,
  };

  componentDidMount() {
    this.infoUser();
  }

  updateUserAndRedirect = async () => {
    const { history } = this.props;
    this.setState({ loading: true });
    const { name, description, image, email } = this.state;
    const obj = {
      name,
      email,
      image,
      description,
    };
    await updateUser(obj);
    this.setState({ loading: false });
    history.push('/profile');
  };

  validationField = () => {
    const { name, description, image, email } = this.state;
    const maxNum = 250;
    const validationName = name.length > 0;
    const validationDescription = description.length > 0 && description.length <= maxNum;
    const validationImage = image.length > 0;
    const validationEmail = email.includes('@') && email.includes('.com');
    const validationFields = !(
      validationName
      && validationImage
      && validationEmail
      && validationDescription
    );
    this.setState({
      validation: validationFields,
    });
  };

  infoUser = async () => {
    this.setState({
      loading: true,
    });

    const getInfoUser = await getUser();
    const { name, email, image, description } = getInfoUser;

    this.setState({
      loading: false,
      name,
      description,
      image,
      email,
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.validationField());
  };

  render() {
    const { loading, validation, name, email, description, image } = this.state;
    return (
      <div>
        <Header />
        {(loading) ? <Loading />
          : (
            <div
              className="profileDivEdit"
              data-testid="page-profile-edit"
            >
              <div className="profileContainerEdit">
                Nome
                <input
                  className="profileNameEdit"
                  type="text"
                  data-testid="edit-input-name"
                  name="name"
                  value={ name }
                  placeholder="Fique à vontade para usar seu nome social"
                  onChange={ this.handleChange }
                />
                Email
                <input
                  className="profileEmailEdit"
                  type="email"
                  data-testid="edit-input-email"
                  name="email"
                  value={ email }
                  onChange={ this.handleChange }
                />
                Descrição
                <textarea
                  className="profileDescriptionEdit"
                  data-testid="edit-input-description"
                  cols="50"
                  rows="5"
                  placeholder="Sobre mim"
                  name="description"
                  value={ description }
                  onChange={ this.handleChange }
                />
                <input
                  className="profileImageEdit"
                  type="text"
                  data-testid="edit-input-image"
                  src=""
                  alt=""
                  name="image"
                  value={ image }
                  onChange={ this.handleChange }
                />
                <button
                  className="buttonEdit"
                  type="button"
                  data-testid="edit-button-save"
                  disabled={ validation }
                  onClick={ this.updateUserAndRedirect }
                >
                  Salvar
                </button>
              </div>
            </div>
          )}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.string,
  }),
}.isRequired;
