package com.example.podify;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@EnableJpaRepositories(basePackages = "com.example.podify.repository.jpa")
@EnableMongoRepositories(basePackages = "com.example.podify.repository.mongo")
public class PodifyApplication {

	public static void main(String[] args) {
		SpringApplication.run(PodifyApplication.class, args);
	}

}
