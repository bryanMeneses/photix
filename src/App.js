import React from 'react';
import './App.css';

//Dependencies
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

//Components
import Header from './components/header/Header'
import Home from './components/home/Home';
import Latest from './components/images/Latest'
import SearchPhotos from './components/searchphotos/SearchPhotos'
import Details from './components/details/Details';
import About from './components/about/About'


const App = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/latest" component={Latest} />
          <Route path="/search" component={SearchPhotos} />
          <Route path="/details/:id" component={Details} />
          <Route path="/about" component={About} />
        </Switch>
      </div>
    </Router>
  );
}


export default App;
