import React from 'react'
import './App.css';
import Header from './screens/Header'
import About from './screens/About'
import { Footer } from './screens/Footer'
import MainBody from './screens/MainBody'
import { ContactUs } from './screens/ContactUs'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


function App() {


  return (
    <>

      <Router>
        <Header title="My Todos List" searchBar={false} />
        <Switch>
          <Route exact path="/" render={() => {
            return (
              <>
                <MainBody />
              </>)
          }}>
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/contact">
            <ContactUs />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
}

export default App;
