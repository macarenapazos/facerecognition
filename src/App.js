import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Clarifai from 'clarifai';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import './App.css'; 

const app = new Clarifai.App({
  apiKey: '14a18267376347ada27e9f4cb8b7dc70'
});

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

class App extends Component {
  constructor(){
  	super();
  	this.state ={
  		input: '',
      imageURL: ''
  	};
  }

  onInputChange = (event) => {
  	this.setState({input: event.target.value});
  }

  onButtonSubmit =() => {
    this.setState({imageURL: this.state.input});
    app.models
     .predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
     .then(
      function(response){
        
      },
      function(err){

      }
     );
  } 

 
  render(){
	  return (
	    <div className="App">

	        <Particles className='particles'
	            params={particlesOpcions}
	        />
	      <Navigation />
	      <Logo />
	      <Rank />
	      <ImageLinkForm 
	      	onInputChange={this.onInputChange} 
	      	onButtonSubmit={this.onButtonSubmit}/>
	      <FaceRecognition  imageURL={this.state.imageURL}/>
	    </div>
	  );
	}
}

export default App;
