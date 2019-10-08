package com.cs.graphgenerator.controller;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.cs.graphgenerator.model.Graph;
import com.cs.graphgenerator.service.GraphService;

@Validated
@RestController
@RequestMapping("/graph")
public class GraphRestController {
	@Autowired
	private GraphService graphService;

	@RequestMapping(value = "generateGraph/{nodeCount}", method = RequestMethod.POST)
	public ResponseEntity<Graph> createWithAdjacencyList(@PathVariable("nodeCount") @Min(5) @Max(100) int nodeCount, 
			@RequestParam("type") String type) {
		if (type != null) {
			if (type.equals("adjacency-list")) {
				return ResponseEntity.ok(graphService.generateWithAdjacencyList(nodeCount));
			} else if (type.equals("adjacency-matrix")) {
				return ResponseEntity.ok(graphService.generateWithAdjacencyMatrix(nodeCount));
			}
		}
		return ResponseEntity.badRequest().build();
	}
}
