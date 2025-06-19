# Electrospinning Community Data Collection

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A community-driven web platform for collecting, sharing, and accessing electrospinning data. 
---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Project Overview

Electrospinning is a versatile technique for producing nanofibers with applications across material science, biotechnology, and more. This project provides a centralized platform where users can upload, browse, and analyze electrospinning experimental data collaboratively. It aims to accelerate research by sharing valuable data within the community.

---

## Features

- Upload and manage electrospinning datasets
- Browse and search community-contributed data

---

## Tech Stack

| Layer          | Technology             |
|----------------|------------------------|
| Backend        | Java Spring Boot       |
| Frontend       | React.js               |
| Database       | MySQL                  |
| Build Tool     | Maven                  |
| API Format     | RESTful JSON API       |

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Java JDK 17+](https://jdk.java.net/)
- [Node.js & npm](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- [Maven](https://maven.apache.org/)

---

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/taltechloc/electrospinning-data.org.git
cd electrospinning-data.org
```

#### 2. Setup MySQL database
Log in to your MySQL shell and create the database:
```
CREATE DATABASE electrospinning;
```
#### 3. Configure development_build_and_run.sh

Update the configuration in backend/my-backend/install/development_build_and_run.sh with your MySQL database username, password, and admin credentials. Running this script will automatically configure application.properties.
#### 4. Build and run the backend development server

Make the script executable (only needed once):
```bash
chmod +x backend/my-backend/install/development_build_and_run.sh
```
Run the script:
```bash
./backend/my-backend/install/development_build_and_run.sh
```
This will configure, build, and start the backend development server.


#### 5. Setup and run frontend
Navigate to the frontend directory where package.json is located (usually /frontend/sw), then install dependencies:

```
cd frontend/sw
npm install
```
Make the startup script executable (only needed once):
```bash
chmod +x start_local.sh
```
Run the startup script:
```bash
./start_local.sh 
```
### Running the Application

- Backend runs on http://localhost:8080 by default.

- Frontend runs on http://localhost:3000 by default.

Open your browser and access the frontend URL to start interacting with the application.

### Contributing
Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (git checkout -b feature-name)
3. Commit your changes (git commit -m 'Add some feature')
4. Push to the branch (git push origin feature-name)
5. Open a Pull Request

Please make sure your code follows existing style and includes appropriate tests.

### License
This project is licensed under the MIT License - see the LICENSE file for details.


### Contact
For questions, suggestions, or support, please reach out to:
- Mehrab Mahdian - mehrab.mahdian@taltech.ee