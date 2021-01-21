import react from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import HomePage from './components/Pages/HomePage'


function App() {
  return (
    <>
    <Router>
      <Navbar />
      <switch>
        <Route path='/' exact component=
        {HomePage}/>
      </switch>
      </Router>

    </>
  );
}

export default App;
