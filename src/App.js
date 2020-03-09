import React, {Component} from 'react';
import './App.css';

//import {AltenticarService} from './services/AltenticarService';

import Navbar from './components/Navbar';

import Home from './views/Home';
import NodeQuery from './views/NodeQuery';
import Servers from './views/Servers';

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';


class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      listNodeQuery: [],
      progressBar: {
        loading: false,
        position: '20%'
      }
    }

  }

  async componentDidMount(){
    //await AltenticarService.login({mail: 'marcon@mh4sh.dev', pass: 'asd'});
  }

  render(){
    const {progressBar} = this.state;
    return (
      <div className="App">
        <Router>
            <Route path={'/'} component={(props) => <Navbar {...props} progressBar={progressBar.position} />} />
          
          <Switch>
            <Route path={'/'} exact component={(props) => <Home {...props} />} />
            <Route path={'/servidores/'} exact component={(props) => <Servers {...props} />} />
            <Route path={'/nodequery/'} component={(props) => <NodeQuery {...props} />}  />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
