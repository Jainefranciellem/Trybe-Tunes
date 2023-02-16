import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Loading from './components/Loading';

class App extends React.Component {
  state = {
    inputName: '',
    isDisable: true,
    loading: false,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, () => this.enableButton());
  };

  enableButton = () => {
    const { inputName } = this.state;
    const maxNum = 3;
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

  stateLoading = () => {
    this.setState(({ loading }) => ({ loading: !loading }));
  };

  render() {
    const { loading } = this.state;
    if (loading) {
      return <Loading />;
    }

    return (
      <BrowserRouter>
        <Switch>
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="/profile" component={ Profile } />
          <Route
            exact
            path="/"
            render={ (props) => (
              <Login
                { ...props }
                { ...this.state }
                handleChange={ this.handleChange }
                stateLoading={ this.stateLoading }
              />
            ) }
          />
          <Route path="*" component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
