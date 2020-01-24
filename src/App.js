import React, {Component} from 'react';
import './App.css';

import Form from './components/Form'
import Recipes from './components/Recipes'
import {withRouter} from 'react-router-dom'

class App extends Component{
  state = {
    Application_ID: '3294b6c1',
    Application_Keys: '8d0474f1da774c34ea0fc46577052250',

    recipes: [],
    searchInput: '',
    HTTPRequestValue: 'chicken',
    HTTP_RequestUrl: '',
    viewRecipe: false
  }

  componentDidMount = () =>{
    if(this.props.match.params.label)
        this.setState({HTTPRequestValue: this.props.match.params.label});
    
    this.sendHTTPRequest();
  }

  componentDidUpdate = (PrevProps, prevState) =>{
    if(prevState.HTTPRequestValue !== this.state.HTTPRequestValue){
      this.sendHTTPRequest();
    }
  }

  handleOnChange = event => {
    event.preventDefault();
    this.setState({searchInput: event.target.value});
  }

  handleOnSubmit = event => {
    event.preventDefault();

    // this.setState(prevState => {
    //   return{
    //     HTTPRequestValue: event.target.elements.searchInput.value
    //   }
    // })

    this.setState({HTTPRequestValue: event.target.elements.searchInput.value});
    this.setState({searchInput: ''})
  }

  sendHTTPRequest = async () => {
      const HTTP_RequestUrl = 
       `https://api.edamam.com/search?q=${this.state.HTTPRequestValue}&app_id=${this.state.Application_ID}&app_key=${this.state.Application_Keys}`;
      this.setState({HTTP_RequestUrl: HTTP_RequestUrl});
      
      const response = await fetch(HTTP_RequestUrl);
      const data = await response.json();

      this.setState({recipes: data.hits});
  }

  handleOnClick = event =>{
    event.preventDefault();
    this.setState({viewRecipe: true})
  }

  render() {  
    return (
        <div className="App">
          <header className="App-header">
            <h1 className='App-title'>Recipes</h1>
          </header>
          <Form onChange={this.handleOnChange}
                searchInput={this.state.searchInput}
                onSubmit={this.handleOnSubmit}/>
          <Recipes recipes={this.state.recipes} 
                  HTTPRequestValue={this.state.HTTPRequestValue}/>         
        </div>
    );
  }
}

export default withRouter(App);
