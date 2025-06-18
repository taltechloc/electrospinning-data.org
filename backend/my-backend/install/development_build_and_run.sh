#!/bin/bash

set -e

cd ..

export DB_URL=jdbc:mysql://localhost:3306/electrospinning
export DB_USERNAME=USERNAME
export DB_PASSWORD='PASSWORD'
export APP_CORS_ALLOWED_ORIGIN="*"
export JWT_SECRET='YourVerySecretKey1234567890'
export ADMIN_USERNAME='ADMIN_USERNAME'
export ADMIN_PASSWORD='ADMIN_PASSWORD'

mvn clean install
export $(grep -v '^#' .env | xargs)
mvn spring-boot:run
