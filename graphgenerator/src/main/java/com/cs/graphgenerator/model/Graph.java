package com.cs.graphgenerator.model;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="graphs")
@TypeAlias(value="graph")
public class Graph {
	@Id
	private String id;

	private int nodeCount;

	private List<String> relations;

	private String relationStoreType;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public int getNodeCount() {
		return nodeCount;
	}

	public void setNodeCount(int nodeCount) {
		this.nodeCount = nodeCount;
	}

	public List<String> getRelations() {
		return relations;
	}

	public void setRelations(List<String> relations) {
		this.relations = relations;
	}

	public String getRelationStoreType() {
		return relationStoreType;
	}

	public void setRelationStoreType(String relationStoreType) {
		this.relationStoreType = relationStoreType;
	}
}
