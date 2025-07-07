# mishaInfotech
Complete **User Registration and Listing**  assessment. It includes:

-  React.js frontend (with Bootstrap styling and pagination)
-  Spring Boot backend (REST APIs with validation)
-  MySQL database
-  Image preview and Base64 storage
-  Pagination with filtering by name, gender, and state

----------------------------------------------------------------
Features

- User registration form with:
  - Validation (name, contact, email, DOB format, etc.)
  - Dependent dropdowns (State → City)
  - Hobbies multi-select
  - Photo upload with preview
- View all registered users in a paginated table with:
  - Photo thumbnails
  - Filtering (by name, gender, state)
  - Server-side pagination
- Backend REST APIs with DTO validation, paging, sorting


----------------------------------------------------------------
Tech Stack


 Layer     | Tech |
|-----------|------|
| Frontend  | React.js, React Router, Bootstrap, Axios |
| Backend   | Spring Boot, Spring Data JPA, Hibernate |
| Database  | MySQL |
| Pagination | `react-paginate` (frontend), `Pageable` (backend) |


---------------------------------------------------------------
how to set up and run the project
1. Clone the repository
2. Install dependencies using npm like axios , react-router-dom, bootstrap, etc. for frontend.
3 setup backend dependencies using maven for spring boot project.
4. Configure database connection in application.properties file.
5. Run the application using npm start for frontend and mvn spring-boot:run for backend.
6. Access the application at http://localhost:3000 for frontend and http://localhost:8080 for backend.
7. Register users and view them in the paginated table.
8. Test the filtering and pagination functionality.
11. Use Postman or any other tool to test the REST APIs.

---------------------------------------------------------------------
below code output screnesohoot

![alt text](registraionpage.png)
![alt text](mandotryfileds.png)
![alt text](statevalidation.png)
![alt text](cityvalidation.png)
![alt text](term.png)
![alt text](listingpage.png)
![alt text](filterpage.png)

-----------------------------------------------------------------

Inhansment Ideas:


we can use cicd pipeline to automate the build and deployment process
further we can genrate docker file(for managing containerization) of it and deploy it on kubernetes cluster(for scaling up and down ) and loadbalancer for load distribution. 
Use of JWT for authentication or
Use of OAuth for authentication
Use of Redis for caching
Use of kafka for messaging and handeling the data in the real time for bulk hits on registration page

Deploy on aws or local tomcat by making war file.


