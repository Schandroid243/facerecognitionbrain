import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import { useState } from 'react';
import Clarifai from "clarifai";
import FaceRecognition from './components/FaceRecognition/FaceRecognition';


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
  apiKey: "b3064c256d1f4421b08a6d5a2cbedc90",
});

function App() {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const onInputChange = (event) => {
    setInput(event.target.value);
    console.log(event.target.value);
  }
  const onSubmit = () => {
    console.log('click');
    
    setImageUrl(input);
    app.models.predict(Clarifai.FACE_DETECT_MODEL, input).then(
      function(response) {
        //Do something 
        console.log(response);
      },
      function(error) {
        //Do something
      }
    )
  }
  return (
    <div className="App">
      <Particles className='particles'
        params={particlesOption} ParticlesNumber={40} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm  onInputChange={onInputChange} onSubmit={onSubmit}/>
      <FaceRecognition imageUrl={imageUrl} />
    </div>
  );
}

export default App;
