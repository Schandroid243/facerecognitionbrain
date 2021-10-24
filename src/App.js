import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';


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

function App() {
  return (
    <div className="App">
      <Particles className='particles'
        params={particlesOption} ParticlesNumber={40} />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/* {
      
      <FaceRecognition />} */}
    </div>
  );
}

export default App;
