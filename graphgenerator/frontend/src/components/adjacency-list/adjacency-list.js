import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Graph from '../graph/graph';

class AdjacencyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      graphId: null,
      list: [],
      graph: { nodes: [], edges: [] }
    };
  }

  componentDidMount() {
    const nodeCount = this.props.match.params.nodeCount;

    axios.post(`http://localhost:8080/graph/generateGraph/${nodeCount}?type=adjacency-list`, {}).then((result) => {
      this.setState({ 
        graphId: result.data.id, 
        list: result.data.relations, 
        graph: this.getGraphElementsToDraw(result.data.relations) 
      });
    });
  }

  getGraphElementsToDraw(list) {
    let nodeList = [];
    let edgeList = [];
    for (let i = 0; i < list.length; i++) {
      nodeList.push({ data: { id: i }});

      list[i].split('.').forEach(element => {
        if (element != i && element != '') {
          edgeList.push({ data: {
            id: i + '-to-' + element,
            source: i,
            target: element
          }});
        }
      });
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
            <table className="table table-bordered" style={{tableLayout: 'fixed', width: '100%'}}><caption style={{captionSide: 'top'}}>ADJACENCY LIST</caption><tbody>{ this.state.list.map((row, rowIndex) => { const cols = row.split('.').map((column, columnIndex) => <td style={{padding: 0, textAlign: 'center'}} data-toggle="tooltip" data-placement="top" title={rowIndex + '-' + columnIndex} key={columnIndex}>{column}</td>); return (<tr key={rowIndex}>{cols}</tr>); }) }</tbody></table>
          </div>
        </div>
      </div>
    );
  }
}

export default AdjacencyList;
