import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import './App.css';
import { connect } from 'react-redux';

import { 
  addFaceBox,
  changeInput,
  updateUserInfo,
  updateImageUrl,
  updateSignIn,
  updateRoute } from './actions';

console.log("this is a test");

const particleOptions = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 800
      }
      }
    }
}

const mapStateToProps = state => {
  return {
    box: state.addFaceBox.box,
    input: state.inputStateChange.input,
    user: state.userInfoUpdate.user,
    imageUrl: state.imageUrlUpdate.imageUrl,
    isSignedIn: state.signInUpdate.isSignedIn,
    route: state.routeUpdate.route
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    displayFaceBox: (box) => dispatch(addFaceBox(box)),
    onInputChange: (event) => dispatch(changeInput(event.target.value)),
    loadUser: (data) => dispatch(updateUserInfo(data)),
    onImageUrlInput: (url) => dispatch(updateImageUrl(url)),
    signInChange: (bool) => dispatch(updateSignIn(bool)),
    routeChange: (route) => dispatch(updateRoute(route))
  }
}

class App extends Component {

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  onButtonSubmit = () => {
    const { displayFaceBox, input, onImageUrlInput, loadUser, user } = this.props;
    onImageUrlInput(input);
    fetch(' https://boiling-sea-92403.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: input
      })
    })
    .then(response => response.json())
    .then(response => {
      if (response) {
        fetch(' https://boiling-sea-92403.herokuapp.com/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          loadUser(count)
        })
        .catch(console.log)
      }
      displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    const {signInChange, routeChange} = this.props;
    if (route === 'signout') {
      signInChange(false);
      routeChange('signin');
    } else if (route === 'home') {
      signInChange(true);
      routeChange(route);
    } else {
      routeChange(route);
    }
  }

  render() {
    const { box, onInputChange, loadUser, user, imageUrl, isSignedIn, route } = this.props;
    return (
      <div className="App">
      <Particles className='particles'
        params={particleOptions} />
        <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn} route={route}/>
        { route === 'home'
        ? <div>
            <Logo />
            <Rank name={user.name} entries={user.entries}/>
            <ImageLinkForm
              onInputChange={onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            /> 
            <FaceRecognition box={box} imageUrl={imageUrl}/>
          </div>
        : (
            route === 'signin' 
            ? <SignIn 
                onRouteChange={this.onRouteChange}
                loadUser={loadUser}
              />
            : <Register
                onRouteChange={this.onRouteChange}
                loadUser={loadUser}
              />
          )
        }
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
