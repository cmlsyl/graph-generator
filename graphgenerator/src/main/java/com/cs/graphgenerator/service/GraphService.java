package com.cs.graphgenerator.service;

import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cs.graphgenerator.model.Graph;
import com.cs.graphgenerator.repository.GraphRepository;

@Service
public class GraphService {

	@Autowired
	private GraphRepository graphRepository;

	public Graph generateWithAdjacencyMatrix(int nodeCount) {
		Graph graph = new Graph();
		graph.setRelationStoreType("ADJACENCY_MATRIX");
		graph.setNodeCount(nodeCount);
		List<String> relations = Stream.of(generateGraph(nodeCount))
				.flatMapToInt(IntStream::of)
				.mapToObj(String::valueOf)
				.collect(Collectors.toList());
		graph.setRelations(relations);
		
		graphRepository.save(graph);

		return graph;
	}

	public Graph generateWithAdjacencyList(int nodeCount) {
		Graph graph = new Graph();

		graph.setRelationStoreType("ADJACENCY_LIST");
		graph.setNodeCount(nodeCount);
		int[][] matrix = generateGraph(nodeCount);
		List<String> relations = IntStream.range(0, nodeCount)
				.mapToObj(rowIndex -> {
					String adjacencyString = rowIndex + ".";
					for (int i = 0; i < nodeCount; i++) {
						if (matrix[rowIndex][i] == 1) {
							adjacencyString += i + ".";
						}
					}
					return adjacencyString;
				})
				.collect(Collectors.toList());
		graph.setRelations(relations);
		
		graphRepository.save(graph);

		return graph;
	}

	private int[][] generateGraph(int nodeCount) {
		int[][] matrix = new int[nodeCount][nodeCount];

		int relationCount = generateRandomNumber(2, nodeCount / 2);

		while (relationCount > 0) {
			int from = generateRandomNumber(0, nodeCount - 2);
			int to = generateRandomNumber(from + 1, nodeCount - 1);
			while (matrix[from][to] == 1) {
				from = generateRandomNumber(0, nodeCount - 2);
				to = generateRandomNumber(from + 1, nodeCount - 1);
			}
			matrix[from][to] = 1;
			matrix[to][from] = 1;
			relationCount--;
		}

		return matrix;
	}

	private int generateRandomNumber(int min, int max) {
		Random random = new Random();
		return random.nextInt(max - min + 1) + min;
	}
}
