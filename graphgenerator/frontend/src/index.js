import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { HashRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import AdjacencyList from './components/adjacency-list/adjacency-list';
import AdjacencyMatrix from './components/adjacency-matrix/adjacency-matrix';

ReactDOM.render(<HashRouter>
      <div>
        <Route exact path='/' component={App} />
        <Route path='/adjacencyList/:nodeCount' component={AdjacencyList} />
        <Route path='/adjacencyMatrix/:nodeCount' component={AdjacencyMatrix} />
      </div>
  </HashRouter>, document.getElementById('root'));
