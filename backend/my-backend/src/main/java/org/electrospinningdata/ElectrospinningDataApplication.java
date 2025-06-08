package org.electrospinningdata;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class ElectrospinningDataApplication {
	private static final Logger logger = LoggerFactory.getLogger(ElectrospinningDataApplication.class);


	public static void main(String[] args) {
		SpringApplication.run(ElectrospinningDataApplication.class, args);
		logger.info("Server is running.");
	}
}
