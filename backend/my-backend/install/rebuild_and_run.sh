#!/bin/bash

set -e

cd ..
mvn clean install
export $(grep -v '^#' .env | xargs)
mvn spring-boot:run
