# Employee-User-Management-Jwt

A Spring Boot - React based web application using JWT to efficiently manage employee skills and to-do activities.

## Overview

This application serves as a comprehensive tool for efficiently handling employee skills and to-do activities by implementing essential CRUD operations. The technology stack consists of React JS for the frontend and Spring Boot for the backend. To safeguard backend resources, Spring Security is employed, and token generation is achieved through standard JWT (JSON Web Token). The application features a secure and fully functional login system.

For data storage, Microsoft SQL Server is utilized, and Redis serves as the caching platform. Redis optimizes database interactions by storing fetched data. When data is retrieved from the database, it is also uploaded to Redis. Upon subsequent refreshes, the application retrieves data from Redis instead of the database, enhancing performance.

To address potential discrepancies in data between Redis and the database, a management panel includes a button to refresh Redis data for a specific user. This button deletes the existing key from Redis, ensuring that subsequent refreshes display the most up-to-date information.

## Key Features

- **Skills Management:**
  - Update, delete, view, and create skills.
  - Search functionality for efficient skill retrieval.

- **Todo Management:**
  - Update, delete, view, and create to-dos.
  - Search functionality for efficient to-do retrieval.

- **Admin Privileges:**
  - User management features for admin users.
  - Update user privileges, delete users, and create new users.

## Backend Setup

### Step 1

Clone and import this Spring Boot project.

### Step 2

Ensure Java 17 is installed before running this Spring Boot application.

### Step 3

Check the configuration in the `application.properties` file and modify it according to your setup.

```properties
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=EmployeeManagementDB;encrypt=true;trustServerCertificate=true;
spring.datasource.username=sa
spring.datasource.password=*******
spring.datasource.driver-class-name=com.microsoft.sqlserver.jdbc.SQLServerDriver
logging.file.name=D:/SpringLogs/EmployeeManagement.log
redis.host=localhost
redis.port=6379
```
Build and Run
If Java 17 and Maven are installed, build the fat jar using the following command:

```bash
mvn clean install -Dmaven.test.skip=true
```

## Frontend Setup

### Step 1

Fork the frontend part from the GitHub repository.

### Step 2

Install the dependencies by executing:

```bash
npm install
```

### Step 3

Start the frontend application with : 

```bash
npm start
```

It's as simple as that!