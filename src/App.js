import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import React, { useState } from 'react';
import Clarifai from "clarifai";
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import axios from 'axios';


const particlesOption = {
  interactivity: {
    detectsOn: "canvas",
    events: {
      onClick: {
        enable: true,
        mode: "push",
      },
      onHover: {
        enable: true,
        mode: "repulse",
      },
      resize: true,
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 200,
        duration: 0.4,
      },
    },
  },
    particles: {
      collisions: {
        enable: true,
      },
      number: {
        density: {
          enable: true,
          value_area: 800,
        },
        value: 120,
      }
    }
}

const app = new Clarifai.App({
  apiKey: "ac4d7dbfbce4443882890d537487ea88",
});

function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [boxInfo, setBoxInfo] = useState({leftCol: 0, topRow: 0, rigthCol: 0, bottomRow: 0});
  const [route, setRoute] = useState('signin');
  const [isSignedIin, setIsSignedIin] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    myentries: 0,
    joined: ''
  });

  const onInputChange = (event) => {
    setInput(event.target.value);
    console.log(event.target.value);
  }

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rigthCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  const displayFaceBox = (boxData) => {
    setBoxInfo(boxData);
  }

  const onRouteChange = (path) => {
    setRoute(path);
    if(path === 'signout') {
      setIsSignedIin(false);
    } else if(path === 'home') {
      setIsSignedIin(true);
    } 
  }

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      myentries: data.myentries,
      joined: data.joined,
    });
  }

  const onSubmit = () => {
    setImageUrl(input);
    app.models.predict(Clarifai.CELEBRITY_MODEL, input)
              .then(response => {

                if(response) {
                  axios.put(`http://localhost:7200/image/`, {
                    id: user.id,
                  }).then((response) => {
                    //Show merki to know why it doesn't update the state
                    let entries = response.data;
                    setUser(Object.assign(user, {myentries: entries}))
                  });
                }
                displayFaceBox(calculateFaceLocation(response))
              })
              .catch(err => console.log(err));
             
  }
  return (
    <div className="App">
      <Particles className='particles'
        params={particlesOption} ParticlesNumber={40} />
      <Navigation isSignedIin={isSignedIin} onRouteChange= {onRouteChange}/>
      {
        route === 'home'
        ?<div>
          <Logo />
          <Rank name={user.name} entries={user.myentries}/>
          <ImageLinkForm  onInputChange={onInputChange} onSubmit={onSubmit}/>
          <FaceRecognition box={boxInfo} imageUrl={imageUrl} />
        </div>
        :(
          route === 'signin'
          ?<Signin onRouteChange= {onRouteChange} loadUser={loadUser}/>
          :<Register onRouteChange= {onRouteChange} loadUser={loadUser}/>
        )
      }
    </div>
  );
}

export default App;
