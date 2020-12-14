import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css';

const particlesOpcions = {
    particles: {
    	number:{
    		value: 250,
    		density:{
    			enable: true,
    			value_area: 800
    		}
    	}
    }       
}

function App() {
  return (
    <div className="App">

        <Particles className='particles'
            params={particlesOpcions}
        />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      {/*<FaceRecognition />*/}
    </div>
  );
}

export default App;
