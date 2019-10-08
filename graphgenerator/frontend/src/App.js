import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      nodeCount: 50
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
    this.setState({
      nodeCount: e.target.value
    });
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-heading" style={{textAlign: 'center', paddingTop: '100px'}}>
            <h1>Random Graph Generator</h1>
          </div>
          <div className="panel-body">
            <div className="d-flex justify-content-center my-4">Node count: { this.state.nodeCount }</div>
            <div className="d-flex justify-content-center my-4">
              <span style={{paddingRight: '10px'}}>5</span>
              <span className="w-50">
                <input type="range" min="5" max="100" data-slider-value={ this.state.nodeCount } onChange={ this.handleInputChange } className="custom-range"/>
              </span>
              <span style={{paddingLeft: '10px'}}>100</span>
            </div>
            <table className="table table-stripe">
              <tbody>
                <tr>
                  <td style={{textAlign: 'center'}}><Link to={`/adjacencyList/${this.state.nodeCount}`}>Create graph with adjacency list</Link></td>
                  <td style={{textAlign: 'center'}}><Link to={`/adjacencyMatrix/${this.state.nodeCount}`}>Create graph with adjacency matrix</Link></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
