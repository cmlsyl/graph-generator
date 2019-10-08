import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Graph from '../graph/graph';

class AdjacencyMatrix extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graphId: null,
      matrix: [],
      graph: { nodes: [], edges: [] }
    };
  }

  componentDidMount() {
    const nodeCount = this.props.match.params.nodeCount;

    axios.post(`http://localhost:8080/graph/generateGraph/${nodeCount}?type=adjacency-matrix`, {}).then((result) => {
      const adjacencyMatrix = this.listToMatrix(result.data.relations, result.data.nodeCount);
      this.setState({ 
        graphId: result.data.id, 
        matrix: adjacencyMatrix, 
        graph: this.getGraphElementsToDraw(adjacencyMatrix)
      });
    });
  }

  listToMatrix(list, nodeCount) {
    let matrix = [];
    for (let i = 0; i < nodeCount; i++) {
      matrix.push([]);
      for (let j = 0; j < nodeCount; j++) {
        matrix[i].push(list[i * nodeCount + j]);
      }
    }
    return matrix;
  }

  getGraphElementsToDraw(matrix) {
    let nodeList = [];
    for (let i = 0; i < matrix.length; i++) {
      nodeList.push({ data: { id: i, color: '#ff0000ff' }});
    }

    let edgeList = [];
    for (let i = 0; i < matrix.length; i++) {
      for (let j = i + 1; j < matrix.length; j++) {
        if (matrix[i][j] == 1) {
          edgeList.push({ data: {
            id: i + '-to-' + j,
            source: i,
            target: j,
            edgeColor: '#ff00ff00'
          }});
        }
      }
    }

    return { nodes: nodeList, edges: edgeList };
  }

  render() {
    return (
      <div className="container">
        <div className="panel panel-default">
          <div className="panel-body">
            <h4><Link to="/">Back</Link></h4>
            <div style={{height: '95vh'}}>
              <Graph graphData = {this.state.graph}/>
            </div>
            <table className="table table-bordered" style={{tableLayout: 'fixed', width: '100%'}}><caption style={{captionSide: 'top'}}>ADJACENCY MATRIX</caption><tbody>{ this.state.matrix.map((row, rowIndex) => { const cols = row.map((column, columnIndex) => <td style={{padding: 0, textAlign: 'center'}} data-toggle="tooltip" data-placement="top" title={rowIndex + '-' + columnIndex} key={columnIndex}>{column}</td>); return (<tr key={rowIndex}>{cols}</tr>); }) }</tbody></table>
          </div>
        </div>
      </div>
    );
  }
}

export default AdjacencyMatrix;
