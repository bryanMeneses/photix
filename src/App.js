import React from 'react';
import './App.css';

//Dependencies
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//Components
import Header from './components/header/Header'
import Images from './components/images/Images'
import SearchPhotos from './components/searchphotos/SearchPhotos'
import Home from './components/home/Home';
import Details from './components/details/Details';
import About from './components/about/About'


function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/latest" component={Images} />
          <Route path="/search" component={SearchPhotos} />
          <Route path="/details/:id" component={Details} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </Router>
  );
}


export default App;