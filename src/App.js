import React, {Component} from 'react';
import Navigation from './components/Navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Clarifai from 'clarifai';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
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
      imageURL: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
  	};
  }

  calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return{
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
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
     .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
     .catch(err => console.log(err));
  } 

  onRouteChange = (route) =>{
    if(route === 'signout'){
      this.setState({isSignedIn: false})
    }else if(route === 'home'){
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }
 
  render(){
    const {isSignedIn, imageURL, route, box} = this.state;
	  return (
	    <div className="App">

	        <Particles className='particles'
	            params={particlesOpcions}
	        />
	      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === 'home' 
          ? <div>
             <Logo />
	           <Rank />
	           <ImageLinkForm 
	      	    onInputChange={this.onInputChange} 
	      	    onButtonSubmit={this.onButtonSubmit}
              />
	           <FaceRecognition box={box} imageURL={imageURL}/>
            </div>
            :(
              route === 'signin' 
              ? <Signin onRouteChange={this.onRouteChange}/>
              : <Register onRouteChange={this.onRouteChange} />
              )
	    }
      </div>
	  );
	}
}

export default App;
