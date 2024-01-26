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

Clone and import this Spring Boot project and update the maven dependencies.

### Step 2

Things to be verified Before starting the server :

* **Java 17** must be installed.
* **Redis Server** must be installed and ensure it is running in localhost on default port **6379**
* **MS SQL Server** must be installed.If installed,make sure to create Database named **EmployeeManagementDB**
* Do not change the server port from **9091** .Leave it as it is since front end application communicating with server on this port only,If you want to change as per your need.Ensure to change the port information in frontend as well for proper communication.

```properties
server.port = 9091
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=EmployeeManagementDB;encrypt=true;trustServerCertificate=true
spring.datasource.username=sa
spring.datasource.password=*******
spring.datasource.driver-class-name=com.microsoft.sqlserver.jdbc.SQLServerDriver
redis.host=localhost
redis.port=6379
```
* For logging setup,make sure to create a folder named "SpringLogs" inside **D drive** as belows.

```properties
logging.file.name=D:/SpringLogs/EmployeeManagement.log
```

**Note :**
 - If you are not satisfied with this configuration,feel free to modify the configurations in application.properties file according to your set up.


 ### Step 3 

 Once the set up is completed,There you go...

 You can start the application from any IDE you are working on.

 If not having any IDE,You can start the application right from your command prompt.But ensure the fat jar is built before that.
 
Build and Run
If Java 17 and Maven are installed, build the fat jar using the following command:

```bash
mvn clean install -Dmaven.test.skip=true
```
Please verify if the jar is built in target location of project.Once it is built,Then You can start the server using this command from project directory in command prompt.

```bash
java -jar {jarname}.jar
```

## Frontend Setup

### Step 1

Fork the frontend part from the GitHub repository.

### Step 2

Install the dependencies by executing the below command :

```bash
npm install
```

### Step 3

Start the frontend application by executing the below command :

```bash
npm start
```

It's as simple as that!