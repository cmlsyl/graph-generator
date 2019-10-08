import React, { Component } from 'react';
import { ReactCytoscape } from 'react-cytoscape';

class Graph extends Component {
	render() {
		return (
            <ReactCytoscape containerID="cy"
                        elements={this.props.graphData}
                        cyRef={(cy) => { this.cyRef(cy) }}
                        cytoscapeOptions={{ wheelSensitivity: 0 }}
                        style={this.getStyle()}
                        layout={{ name: 'cola' }} />
		);
	}

	cyRef(cy) {
		this.cy = cy;
		cy.on('tap', 'node', function (e) {
			var node = e.target;
			console.log('clicked node ' + node.id());
        });
        cy.on('tap', 'edge', function (e) {
			var edge = e.target;
			console.log('clicked edge ' + edge.id());
		});
    }

    getStyle() {
        return [
            {
                selector: 'node',
                style: {
                    'background-color': 'lightblue',
                    'label': 'data(id)',
                    'text-valign': 'center'
                }
            },
            {
                selector: 'edge',
                style: {
                    'width': 2,
                    'line-color': 'green'
                }
            }
        ];
    }
}

export default Graph;