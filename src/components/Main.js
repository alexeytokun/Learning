import React, { Component } from 'react';
import Cards from './Cards';
import '../css/Main.css';

class Main extends Component {

    render() {
        return(
          <div className='main-container'>
              <Cards />
          </div>
        );
    }
}

export default Main;