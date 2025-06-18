#!/bin/bash

set -e
cd ..

export DB_URL=jdbc:mysql://localhost:3306/electrospinning
export DB_USERNAME=root
export DB_PASSWORD='Mysql@25!'
export APP_CORS_ALLOWED_ORIGIN="*"
export JWT_SECRET='YourVerySecretKey1234567890'
export ADMIN_USERNAME='admin'
export ADMIN_PASSWORD='admin'

./mvnw clean package
