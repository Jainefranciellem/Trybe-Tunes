import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';
import '../css/profile.css';

export default class Profile extends Component {
  state = {
    name: '',
    description: '',
    image: '',
    email: '',
    loading: false,
  };

  componentDidMount() {
    this.infoUser();
  }

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

  render() {
    const { name, description, image, email, loading } = this.state;
    return (
      <div>
        {(loading) ? <Loading /> : (
          <>
            <Header />
            <div className="profileDiv" data-testid="page-profile">
              <div className="profileContainer">
                <img
                  className="profileImage"
                  src={ image }
                  data-testid="profile-image"
                  alt=""
                />
                Nome:
                <span className="profileName">{name}</span>
                Email:
                <p className="profileEmail">{email}</p>
                Descrição:
                <p className="profileDescription">{ description }</p>
                <Link className="link" to="/profile/edit">Editar perfil</Link>
              </div>
            </div>
          </>
        )}

      </div>
    );
  }
}
