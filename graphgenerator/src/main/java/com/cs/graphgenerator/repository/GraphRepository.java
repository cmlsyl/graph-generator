package com.cs.graphgenerator.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.cs.graphgenerator.model.Graph;

public interface GraphRepository extends MongoRepository<Graph, String> {

}
